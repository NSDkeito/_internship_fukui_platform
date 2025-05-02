import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import CompanyDashboard from './pages/company/Dashboard';
import StudentProfile from './pages/student/profile';
import CompanyProfile from './pages/company/Profile';
import InternshipSearch from './pages/student/InternshipSearch';
import InternshipDetails from './pages/shared/InternshipDetails';
import Applications from './pages/student/Applications';
import CreateInternship from './pages/company/CreateInternship';
import ManageInternships from './pages/company/ManageInternships';
import StudentSearch from './pages/company/StudentSearch';
import Messages from './pages/shared/Messages';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/ログイン" element={<Login />} />
          <Route path="/新規登録" element={<Register />} />
          
          <Route element={<Layout />}>
            {/* 学生向けルート */}
            <Route 
              path="/学生/ダッシュボード" 
              element={
                <ProtectedRoute userType="student">
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/学生/プロフィール" 
              element={
                <ProtectedRoute userType="student">
                  <StudentProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/学生/インターンシップ検索" 
              element={
                <ProtectedRoute userType="student">
                  <InternshipSearch />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/学生/応募一覧" 
              element={
                <ProtectedRoute userType="student">
                  <Applications />
                </ProtectedRoute>
              } 
            />

            {/* 企業向けルート */}
            <Route 
              path="/企業/ダッシュボード" 
              element={
                <ProtectedRoute userType="company">
                  <CompanyDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/企業/プロフィール" 
              element={
                <ProtectedRoute userType="company">
                  <CompanyProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/企業/インターンシップ作成" 
              element={
                <ProtectedRoute userType="company">
                  <CreateInternship />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/企業/インターンシップ管理" 
              element={
                <ProtectedRoute userType="company">
                  <ManageInternships />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/企業/学生検索" 
              element={
                <ProtectedRoute userType="company">
                  <StudentSearch />
                </ProtectedRoute>
              } 
            />

            {/* 共通ルート */}
            <Route 
              path="/インターンシップ/:id" 
              element={<InternshipDetails />} 
            />
            <Route 
              path="/メッセージ" 
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } 
            />
          </Route>

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;