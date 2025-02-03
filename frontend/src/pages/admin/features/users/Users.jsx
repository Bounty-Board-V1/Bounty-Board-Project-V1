import React from 'react';
import { UsersTable } from './components/UsersTable';

function Users() {
  return (
    <div className="p-6">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">Users Management</h1>
      <UsersTable />
    </div>
  );
}

export default Users;

