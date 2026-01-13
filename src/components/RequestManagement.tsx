import { useState } from 'react';
import { Clock, CheckCircle, XCircle, Send, Inbox } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { SkillTag } from './ui/SkillTag';

type RequestStatus = 'pending' | 'accepted' | 'rejected';

interface Request {
  id: number;
  name: string;
  avatar: string;
  university: string;
  skillOffered: string;
  skillNeeded: string;
  status: RequestStatus;
  date: string;
  message: string;
}

const sentRequests: Request[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    avatar: '👩‍💻',
    university: 'MIT',
    skillOffered: 'React',
    skillNeeded: 'Machine Learning',
    status: 'pending',
    date: '2 hours ago',
    message: 'Hi! I would love to exchange skills with you.',
  },
  {
    id: 2,
    name: 'Mike Johnson',
    avatar: '👨‍🎓',
    university: 'UCLA',
    skillOffered: 'Python',
    skillNeeded: 'Video Editing',
    status: 'accepted',
    date: '1 day ago',
    message: 'Interested in learning video editing from you!',
  },
  {
    id: 3,
    name: 'Lisa Rodriguez',
    avatar: '👩‍💼',
    university: 'UC Berkeley',
    skillOffered: 'UI Design',
    skillNeeded: 'Data Analysis',
    status: 'rejected',
    date: '3 days ago',
    message: 'Would love to learn data analysis!',
  },
];

const receivedRequests: Request[] = [
  {
    id: 4,
    name: 'Emma Wilson',
    avatar: '👩‍🔬',
    university: 'Georgia Tech',
    skillOffered: 'AWS',
    skillNeeded: 'UI Design',
    status: 'pending',
    date: '1 hour ago',
    message: 'Your UI design skills look amazing! Can we exchange?',
  },
  {
    id: 5,
    name: 'David Lee',
    avatar: '👨‍🎨',
    university: 'NYU',
    skillOffered: 'Graphic Design',
    skillNeeded: 'React',
    status: 'pending',
    date: '5 hours ago',
    message: 'I need help with React. Happy to teach design in return!',
  },
  {
    id: 6,
    name: 'James Park',
    avatar: '👨‍🔧',
    university: 'Carnegie Mellon',
    skillOffered: 'Arduino',
    skillNeeded: 'Python',
    status: 'accepted',
    date: '2 days ago',
    message: 'Looking forward to our skill exchange!',
  },
];

export function RequestManagement() {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('received');
  const [requests, setRequests] = useState({
    sent: sentRequests,
    received: receivedRequests,
  });

  const handleAccept = (id: number) => {
    setRequests({
      ...requests,
      received: requests.received.map((req) =>
        req.id === id ? { ...req, status: 'accepted' as RequestStatus } : req
      ),
    });
  };

  const handleReject = (id: number) => {
    setRequests({
      ...requests,
      received: requests.received.map((req) =>
        req.id === id ? { ...req, status: 'rejected' as RequestStatus } : req
      ),
    });
  };

  const getStatusBadge = (status: RequestStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      accepted: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };

    const icons = {
      pending: <Clock className="w-3 h-3" />,
      accepted: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
      >
        {icons[status]}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const currentRequests = requests[activeTab];
  const pendingCount = requests.received.filter(
    (r) => r.status === 'pending'
  ).length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Request Management
        </h1>
        <p className="text-gray-600">
          Manage your skill exchange requests
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex space-x-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'received'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Inbox className="w-4 h-4" />
            <span>Received</span>
            {pendingCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </div>
          {activeTab === 'received' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('sent')}
          className={`px-4 py-3 font-medium text-sm transition-colors relative ${
            activeTab === 'sent'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Sent</span>
          </div>
          {activeTab === 'sent' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
          )}
        </button>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {currentRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                  {request.avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {request.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {request.university}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-gray-500">
                      {request.date}
                    </span>
                  </div>
                </div>

                {/* Skills Exchange */}
                <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <SkillTag
                      skill={request.skillOffered}
                      variant="offer"
                      size="sm"
                    />
                    <span className="text-gray-400">⇄</span>
                    <SkillTag
                      skill={request.skillNeeded}
                      variant="need"
                      size="sm"
                    />
                  </div>
                </div>

                {/* Message */}
                <p className="text-sm text-gray-700 mb-3 italic">
                  "{request.message}"
                </p>

                {/* Actions */}
                {activeTab === 'received' && request.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(request.id)}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReject(request.id)}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Decline
                    </Button>
                  </div>
                )}

                {request.status === 'accepted' && (
                  <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {activeTab === 'sent'
                        ? 'Your request was accepted! Start learning.'
                        : 'You accepted this request. Time to teach!'}
                    </span>
                  </div>
                )}

                {request.status === 'rejected' && (
                  <div className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                    {activeTab === 'sent'
                      ? 'This request was declined.'
                      : 'You declined this request.'}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {currentRequests.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No requests yet
          </h3>
          <p className="text-gray-600">
            {activeTab === 'sent'
              ? 'Start connecting with students to exchange skills!'
              : 'Check back later for new skill exchange requests.'}
          </p>
        </div>
      )}
    </div>
  );
}