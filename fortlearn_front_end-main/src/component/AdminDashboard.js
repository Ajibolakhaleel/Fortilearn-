import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer 
} from 'recharts';

const UserDashboard = () => {
  const [userData, setUserData] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resources');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  useEffect(() => {

      try {
        setLoading(true);
        
        fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then((json) => {
          console.log('data from the db',json)
          setUserData(json.result)}
        )
        .catch(error => console.error(error));

        // fetch user resources
        fetch('http://localhost:3000/resource/all')
        .then(response => response.json())
        .then((json) => {
          console.log('data from the db',json)
          setResources(json.result)}
        )
        .catch(error => console.error(error));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }

    
 
  }, []);


  // Chart data transformations
  const getCategoryDistribution = () => {
    if (!resources.length) return [];
    
    const categories = {};
    resources.forEach(resource => {
      if (categories[resource.category]) {
        categories[resource.category]++;
      } else {
        categories[resource.category] = 1;
      }
    });
    
    return Object.keys(categories).map(category => ({
      name: category,
      value: categories[category]
    }));
  };

  const getResourcesByType = () => {
    if (!resources.length) return [];
    
    const types = {};
    resources.forEach(resource => {
      if (types[resource.type]) {
        types[resource.type]++;
      } else {
        types[resource.type] = 1;
      }
    });
    
    return Object.keys(types).map(type => ({
      name: type,
      count: types[type]
    }));
  };

  const getResourcesByLevel = () => {
    if (!resources.length) return [];
    
    const levels = {};
    resources.forEach(resource => {
      if (levels[resource.levelClass]) {
        levels[resource.levelClass]++;
      } else {
        levels[resource.levelClass] = 1;
      }
    });
    
    return Object.keys(levels).map(level => ({
      name: level,
      count: levels[level]
    }));
  };

  const getResourceCreationTimeline = () => {
    if (!resources.length) return [];
    
    // Group resources by month
    const monthlyData = {};
    resources.forEach(resource => {
      const date = new Date(resource.date_created);
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      
      if (monthlyData[monthYear]) {
        monthlyData[monthYear]++;
      } else {
        monthlyData[monthYear] = 1;
      }
    });
    
    // Convert to array sorted by date
    return Object.keys(monthlyData)
      .map(key => {
        const [month, year] = key.split('/');
        return {
          date: key,
          count: monthlyData[key],
          // For sorting
          sortValue: new Date(parseInt(year), parseInt(month) - 1)
        };
      })
      .sort((a, b) => a.sortValue - b.sortValue)
      .map(({ date, count }) => ({ date, count }));
  };

  const getEnrolledVsAvailableResources = () => {
    if (!userData || !resources.length) return [];
    
    const enrolledCount = userData.enrolledResources.length;
    const totalCount = resources.length;
    
    return [
      { name: "Enrolled", value: enrolledCount },
      { name: "Not Enrolled", value: totalCount - enrolledCount }
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Dashboard</h1>
        {userData && (
          <div className="mt-2 text-gray-600">
            Welcome, <span className="font-medium">{userData.username}</span> | Specialization: <span className="font-medium">{userData.specialisation}</span>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="mb-6 border-b">
        <div className="flex space-x-4">
          <button 
            className={`py-2 px-4 ${activeTab === 'resources' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('resources')}
          >
            Resources
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'enrollment' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setActiveTab('enrollment')}
          >
            Enrollment
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overview Tab */}
      

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <>
            {/* Resources by Category */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Resources by Category</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getCategoryDistribution()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {getCategoryDistribution().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Resources by Type */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Resources by Type</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getResourcesByType()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Resources by Level */}
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Resources by Level</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getResourcesByLevel()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {/* Enrollment Tab */}
        {activeTab === 'enrollment' && (
          <>
            {/* Resource Creation Timeline */}
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Resource Creation Timeline</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getResourceCreationTimeline()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Enrolled Resources List */}
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Your Enrolled Resources</h2>
              {userData && userData?.enrolledResources.length || userData?.enrolledResources.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.enrolledResources.map((resource, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resource.resource.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.resource.type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.resource.category}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.resource.levelClass}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <a 
                              href={resource.resource.resourceLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  You haven't enrolled in any resources yet.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;