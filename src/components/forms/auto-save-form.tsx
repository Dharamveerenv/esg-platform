"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2, Wifi, WifiOff } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

export interface SaveState {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved?: Date;
  error?: string;
  hasUnsavedChanges: boolean;
}

export interface AutoSaveFormProps {
  moduleId: string;
  reportId: string;
  data: Record<string, unknown>;
  onSave?: (data: Record<string, unknown>) => Promise<void>;
  saveInterval?: number; // milliseconds
  children: React.ReactNode;
  className?: string;
  showSaveStatus?: boolean;
  validateBeforeSave?: (data: Record<string, unknown>) => { isValid: boolean; errors: string[] };
}

export function AutoSaveForm({
  moduleId,
  reportId,
  data,
  onSave,
  saveInterval = 5000, // 5 seconds default
  children,
  className = '',
  showSaveStatus = true,
  validateBeforeSave
}: AutoSaveFormProps) {
  const [saveState, setSaveState] = useState<SaveState>({
    status: 'idle',
    hasUnsavedChanges: false
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();
  const lastDataRef = useRef<Record<string, unknown>>(data);
  const mountedRef = useRef(true);

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      mountedRef.current = false;
    };
  }, []);

  // Auto-save logic
  const performSave = useCallback(async (dataToSave: any) => {
    if (!mountedRef.current) return;

    try {
      setSaveState(prev => ({ ...prev, status: 'saving', error: undefined }));

      // Validate data if validator provided
      if (validateBeforeSave) {
        const validation = validateBeforeSave(dataToSave);
        if (!validation.isValid) {
          setSaveState(prev => ({
            ...prev,
            status: 'error',
            error: `Validation failed: ${validation.errors.join(', ')}`
          }));
          return;
        }
      }

      // Use custom save function or default API call
      if (onSave) {
        await onSave(dataToSave);
      } else {
        const response = await apiClient.updateModuleData(reportId, moduleId, {
          ...dataToSave,
          lastUpdated: new Date()
        });

        if (response.status !== 'success') {
          throw new Error(response.message || 'Save failed');
        }
      }

      if (mountedRef.current) {
        setSaveState({
          status: 'saved',
          lastSaved: new Date(),
          hasUnsavedChanges: false,
          error: undefined
        });

        // Store in localStorage as backup
        localStorage.setItem(`esg-module-${moduleId}-${reportId}`, JSON.stringify({
          data: dataToSave,
          timestamp: new Date().toISOString()
        }));
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
      
      if (mountedRef.current) {
        setSaveState(prev => ({
          ...prev,
          status: 'error',
          error: error instanceof Error ? error.message : 'Save failed'
        }));

        // Store in localStorage for offline recovery
        if (!isOnline) {
          localStorage.setItem(`esg-module-offline-${moduleId}-${reportId}`, JSON.stringify({
            data: dataToSave,
            timestamp: new Date().toISOString()
          }));
        }
      }
    }
  }, [moduleId, reportId, onSave, validateBeforeSave, isOnline]);

  // Detect data changes and schedule auto-save
  useEffect(() => {
    const hasChanged = JSON.stringify(data) !== JSON.stringify(lastDataRef.current);
    
    if (hasChanged && data) {
      lastDataRef.current = data;
      setSaveState(prev => ({ ...prev, hasUnsavedChanges: true }));

      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Schedule auto-save
      saveTimeoutRef.current = setTimeout(() => {
        if (isOnline) {
          performSave(data);
        } else {
          // Store offline for later sync
          localStorage.setItem(`esg-module-offline-${moduleId}-${reportId}`, JSON.stringify({
            data,
            timestamp: new Date().toISOString()
          }));
          setSaveState(prev => ({
            ...prev,
            status: 'saved',
            lastSaved: new Date(),
            hasUnsavedChanges: false
          }));
        }
      }, saveInterval);
    }

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [data, saveInterval, isOnline, performSave]);

  // Sync offline data when coming back online
  useEffect(() => {
    if (isOnline) {
      const offlineKey = `esg-module-offline-${moduleId}-${reportId}`;
      const offlineData = localStorage.getItem(offlineKey);
      
      if (offlineData) {
        try {
          const { data: storedData } = JSON.parse(offlineData);
          performSave(storedData).then(() => {
            localStorage.removeItem(offlineKey);
          });
        } catch (error) {
          console.error('Failed to sync offline data:', error);
        }
      }
    }
  }, [isOnline, moduleId, reportId, performSave]);

  // Force save method (can be called externally)
  const forceSave = useCallback(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    return performSave(data);
  }, [data, performSave]);

  // Expose force save method
  useEffect(() => {
    (window as any)[`forceSave_${moduleId}`] = forceSave;
    return () => {
      delete (window as any)[`forceSave_${moduleId}`];
    };
  }, [forceSave, moduleId]);

  const getSaveStatusIcon = () => {
    switch (saveState.status) {
      case 'saving':
        return <Loader2 className="h-3 w-3 animate-spin" />;
      case 'saved':
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />;
      default:
        return null;
    }
  };

  const getSaveStatusText = () => {
    switch (saveState.status) {
      case 'saving':
        return 'Saving...';
      case 'saved':
        return saveState.lastSaved 
          ? `Saved ${saveState.lastSaved.toLocaleTimeString()}`
          : 'Saved';
      case 'error':
        return 'Save failed';
      case 'idle':
        return saveState.hasUnsavedChanges ? 'Unsaved changes' : 'No changes';
      default:
        return '';
    }
  };

  return (
    <div className={`auto-save-form ${className}`}>
      {showSaveStatus && (
        <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded-md">
          <div className="flex items-center gap-2">
            {getSaveStatusIcon()}
            <span className="text-sm text-muted-foreground">
              {getSaveStatusText()}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isOnline ? (
              <Badge variant="outline" className="text-xs">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="secondary" className="text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </div>
      )}

      {saveState.status === 'error' && saveState.error && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {saveState.error}
            <button 
              onClick={() => forceSave()}
              className="ml-2 underline text-sm"
            >
              Retry
            </button>
          </AlertDescription>
        </Alert>
      )}

      {children}
    </div>
  );
}

// Hook for accessing auto-save functionality
export function useAutoSave(moduleId: string) {
  const forceSave = useCallback(() => {
    const saveFunction = (window as any)[`forceSave_${moduleId}`];
    if (saveFunction) {
      return saveFunction();
    }
    return Promise.resolve();
  }, [moduleId]);

  return { forceSave };
}