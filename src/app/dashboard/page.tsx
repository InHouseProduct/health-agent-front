import {
    UserGroupIcon,
    CurrencyDollarIcon,
    ShoppingCartIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';

const stats = [
    {
        name: 'Total Users',
        stat: '1,234',
        icon: UserGroupIcon,
        change: '12%',
        changeType: 'increase',
    },
    {
        name: 'Revenue',
        stat: '$45,678',
        icon: CurrencyDollarIcon,
        change: '8.2%',
        changeType: 'increase',
    },
    {
        name: 'Orders',
        stat: '567',
        icon: ShoppingCartIcon,
        change: '3.2%',
        changeType: 'decrease',
    },
    {
        name: 'Conversion Rate',
        stat: '3.2%',
        icon: ChartBarIcon,
        change: '0.8%',
        changeType: 'increase',
    },
];

export default function DashboardPage() {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div
                        key={item.name}
                        className="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:py-6"
                    >
                        <dt>
                            <div className="absolute rounded-md bg-indigo-500 p-3">
                                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                {item.name}
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline">
                            <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                            <p
                                className={`ml-2 flex items-baseline text-sm font-semibold ${item.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {item.changeType === 'increase' ? '↑' : '↓'} {item.change}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                <div className="mt-4 overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                        <div className="text-center text-gray-500">
                            No recent activity
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 