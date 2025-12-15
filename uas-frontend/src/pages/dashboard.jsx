import React from 'react';
import { Building2, Mail, Eye } from 'lucide-react';

const Dashboard = ({ properties, inquiries }) => {
  const stats = [
    {
      label: 'Total Properties Listed',
      value: 128,
      change: '+5 this month',
      changePositive: true,
      icon: Building2,
      color: 'blue'
    },
    {
      label: 'Total Inquiries Received',
      value: 542,
      change: '+12% this month',
      changePositive: true,
      icon: Mail,
      color: 'blue'
    },
    {
      label: 'Active Listings',
      value: 96,
      change: '-2 from last week',
      changePositive: false,
      icon: Eye,
      color: 'blue'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Olivia!</h1>
        <p className="text-gray-600">Here's a summary of your activity.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5">
            <div className="flex justify-between items-start mb-3">
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className={`p-2 rounded-lg bg-blue-50`}>
                <stat.icon className={`w-5 h-5 text-blue-600`} />
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">{stat.value}</div>
            <div className={`text-sm ${stat.changePositive ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-5 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Recent Inquiries</h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Inquiries
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-700">Inquirer</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-700">Property</th>
                <th className="text-left px-5 py-3 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-right px-5 py-3 text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg">
                        {inquiry.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{inquiry.inquirer}</div>
                        <div className="text-xs text-gray-500">{inquiry.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm">{inquiry.property}</td>
                  <td className="px-5 py-4 text-sm text-gray-600">{inquiry.date}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;