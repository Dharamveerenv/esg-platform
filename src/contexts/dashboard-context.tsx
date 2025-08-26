"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import type { Company, Report } from '@/lib/api-client';

interface DashboardContextType {
  // Company Management
  companies: Company[];
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  loadCompanies: () => Promise<void>;
  
  // Report Management
  reports: Report[];
  selectedReport: Report | null;
  setSelectedReport: (report: Report | null) => void;
  loadReports: (companyId?: string) => Promise<void>;
  
  // State
  isLoading: boolean;
  error: string | null;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // Company state
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  
  // Report state
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load companies on mount
  useEffect(() => {
    loadCompanies();
  }, []);

  // Load reports when company changes
  useEffect(() => {
    if (selectedCompany) {
      loadReports(selectedCompany._id);
    }
  }, [selectedCompany]);

  const loadCompanies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try to load existing companies
      const response = await apiClient.getCompanies();
      
      if (response.status === 'success' && response.data) {
        setCompanies(response.data);
        
        // Select first company if none selected
        if (!selectedCompany && response.data.length > 0) {
          setSelectedCompany(response.data[0]);
        }
      } else {
        // If no companies exist, create a demo company
        console.log('No companies found, creating demo company...');
        await createDemoCompany();
      }
    } catch (error) {
      // If API fails, create demo company for development
      console.log('API error, creating demo company for development...');
      await createDemoCompany();
    } finally {
      setIsLoading(false);
    }
  };

  const createDemoCompany = async () => {
    try {
      const response = await apiClient.createDemoCompany();
      
      if (response.status === 'success' && response.data) {
        const newCompany = response.data;
        setCompanies([newCompany]);
        setSelectedCompany(newCompany);
      }
    } catch (error) {
      setError('Failed to create demo company');
      console.error('Demo company creation error:', error);
    }
  };

  const loadReports = async (companyId?: string) => {
    if (!companyId && !selectedCompany) return;
    
    try {
      const targetCompanyId = companyId || selectedCompany?._id;
      const response = await apiClient.getReports(targetCompanyId);
      
      if (response.status === 'success' && response.data) {
        setReports(response.data);
        
        // Select first report if none selected
        if (!selectedReport && response.data.length > 0) {
          setSelectedReport(response.data[0]);
        }
      } else if (selectedCompany) {
        // If no reports exist, create a demo report
        await createDemoReport(selectedCompany._id);
      }
    } catch (error) {
      // Create demo report if API fails
      if (selectedCompany) {
        await createDemoReport(selectedCompany._id);
      }
    }
  };

  const createDemoReport = async (companyId: string) => {
    try {
      const response = await apiClient.createDemoReport(companyId);
      
      if (response.status === 'success' && response.data) {
        const newReport = response.data;
        setReports([newReport]);
        setSelectedReport(newReport);
      }
    } catch (error) {
      console.error('Demo report creation error:', error);
    }
  };

  const value = {
    // Company Management
    companies,
    selectedCompany,
    setSelectedCompany,
    loadCompanies,
    
    // Report Management
    reports,
    selectedReport,
    setSelectedReport,
    loadReports,
    
    // State
    isLoading,
    error
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};