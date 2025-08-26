"use client"

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle } from 'lucide-react';

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: unknown;
  message: string;
  validator?: (value: unknown) => boolean;
}

export interface ESGFormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'number' | 'email' | 'textarea' | 'select';
  value: unknown;
  onChange: (value: unknown) => void;
  validation?: ValidationRule[];
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  className?: string;
  description?: string;
  unit?: string;
  showValidation?: boolean;
}

export function ESGFormField({
  name,
  label,
  type = 'text',
  value,
  onChange,
  validation = [],
  required = false,
  placeholder,
  options = [],
  className = '',
  description,
  unit,
  showValidation = true
}: ESGFormFieldProps) {
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }>({
    isValid: true,
    errors: [],
    warnings: []
  });

  const [touched, setTouched] = useState(false);

  // Validate field value
  useEffect(() => {
    if (!touched && !value) return; // Don't validate until touched or has value

    const errors: string[] = [];
    const warnings: string[] = [];

    // Add required validation if field is required
    const allValidations = required 
      ? [{ type: 'required' as const, message: `${label} is required` }, ...validation]
      : validation;

    allValidations.forEach(rule => {
      switch (rule.type) {
        case 'required':
          if (!value || (typeof value === 'string' && value.trim() === '')) {
            errors.push(rule.message);
          }
          break;
        
        case 'min':
          if (typeof value === 'number' && value < rule.value) {
            errors.push(rule.message);
          } else if (typeof value === 'string' && value.length < rule.value) {
            errors.push(rule.message);
          }
          break;
        
        case 'max':
          if (typeof value === 'number' && value > rule.value) {
            errors.push(rule.message);
          } else if (typeof value === 'string' && value.length > rule.value) {
            errors.push(rule.message);
          }
          break;
        
        case 'pattern':
          if (typeof value === 'string' && !rule.value.test(value)) {
            errors.push(rule.message);
          }
          break;
        
        case 'custom':
          if (rule.validator && !rule.validator(value)) {
            errors.push(rule.message);
          }
          break;
      }
    });

    setValidationState({
      isValid: errors.length === 0,
      errors,
      warnings
    });
  }, [value, validation, required, label, touched]);

  const handleChange = (newValue: unknown) => {
    setTouched(true);
    onChange(newValue);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const getValidationIcon = () => {
    if (!showValidation || !touched) return null;
    
    if (validationState.errors.length > 0) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    } else if (value && validationState.isValid) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    return null;
  };

  const renderInput = () => {
    const baseProps = {
      id: name,
      name,
      value: value || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        handleChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value),
      onBlur: handleBlur,
      placeholder,
      className: `${validationState.errors.length > 0 ? 'border-red-500' : ''} ${
        validationState.isValid && value ? 'border-green-500' : ''
      }`
    };

    switch (type) {
      case 'textarea':
        return <Textarea {...baseProps} />;
      
      case 'number':
        return (
          <div className="relative">
            <Input 
              {...baseProps} 
              type="number"
              step="any"
            />
            {unit && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                {unit}
              </div>
            )}
          </div>
        );
      
      case 'email':
        return <Input {...baseProps} type="email" />;
      
      case 'select':
        return (
          <Select value={value || ''} onValueChange={handleChange}>
            <SelectTrigger 
              className={validationState.errors.length > 0 ? 'border-red-500' : ''}
              onBlur={handleBlur}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      default:
        return <Input {...baseProps} type="text" />;
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <Label htmlFor={name} className="flex items-center gap-2">
          {label}
          {required && <span className="text-red-500">*</span>}
          {getValidationIcon()}
        </Label>
        
        {showValidation && validationState.isValid && value && (
          <Badge variant="outline" className="text-xs">
            Valid
          </Badge>
        )}
      </div>

      {renderInput()}

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}

      {showValidation && touched && validationState.errors.length > 0 && (
        <Alert className="py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {validationState.errors.join(', ')}
          </AlertDescription>
        </Alert>
      )}

      {showValidation && validationState.warnings.length > 0 && (
        <Alert className="py-2 border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-sm text-yellow-800">
            {validationState.warnings.join(', ')}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

// Predefined validation rules for common ESG fields
export const ESGValidationRules = {
  naceCode: {
    type: 'pattern' as const,
    value: /^\d{2}\.\d{2}$/,
    message: 'NACE code must be in format XX.XX (e.g., 01.11)'
  },
  
  positiveNumber: {
    type: 'min' as const,
    value: 0,
    message: 'Value must be positive'
  },
  
  percentage: {
    type: 'custom' as const,
    message: 'Percentage must be between 0 and 100',
    validator: (value: number) => value >= 0 && value <= 100
  },
  
  email: {
    type: 'pattern' as const,
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address'
  },
  
  phone: {
    type: 'pattern' as const,
    value: /^[\+]?[1-9][\d]{0,15}$/,
    message: 'Please enter a valid phone number'
  },
  
  year: {
    type: 'custom' as const,
    message: 'Year must be between 2000 and current year',
    validator: (value: number) => value >= 2000 && value <= new Date().getFullYear()
  }
};