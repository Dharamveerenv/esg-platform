/**
 * Authentication Routes
 * Basic auth endpoints for demo
 */

const express = require('express');
const router = express.Router();

// Mock auth controller for demo
const mockAuthController = {
  // Demo login endpoint
  login: (req, res) => {
    const { email, password } = req.body;
    
    // Demo response - in real implementation, this would validate credentials
    if (email && password) {
      res.status(200).json({
        status: 'success',
        token: 'demo-jwt-token-' + Date.now(),
        refreshToken: 'demo-refresh-token-' + Date.now(),
        data: {
          user: {
            _id: 'demo-user-id',
            email: email,
            profile: {
              firstName: 'Demo',
              lastName: 'User',
              position: 'ESG Manager',
              department: 'Sustainability'
            },
            companyAssociations: [{
              companyId: 'demo-company-id',
              role: 'Admin',
              permissions: ['ALL_PERMISSIONS']
            }],
            preferences: {
              language: 'en',
              timezone: 'UTC',
              currency: 'EUR'
            },
            isActive: true
          }
        }
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Email and password are required'
      });
    }
  },

  // Demo logout endpoint
  logout: (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully'
    });
  },

  // Demo profile endpoint
  getProfile: (req, res) => {
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          _id: 'demo-user-id',
          email: 'demo@greentech.com',
          profile: {
            firstName: 'Demo',
            lastName: 'User',
            position: 'ESG Manager',
            department: 'Sustainability'
          },
          companyAssociations: [{
            companyId: 'demo-company-id',
            role: 'Admin',
            permissions: ['ALL_PERMISSIONS']
          }],
          preferences: {
            language: 'en',
            timezone: 'UTC',
            currency: 'EUR'
          },
          isActive: true
        }
      }
    });
  },

  // Demo refresh token endpoint
  refreshToken: (req, res) => {
    res.status(200).json({
      status: 'success',
      token: 'demo-new-jwt-token-' + Date.now(),
      refreshToken: 'demo-new-refresh-token-' + Date.now()
    });
  }
};

// Auth routes
router.post('/login', mockAuthController.login);
router.post('/logout', mockAuthController.logout);
router.get('/profile', mockAuthController.getProfile);
router.post('/refresh', mockAuthController.refreshToken);

module.exports = router;