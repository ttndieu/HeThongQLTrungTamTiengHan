// src/pages/admin/AdminFeedbackAnalysisPage.jsx
import React, { useState, useEffect } from 'react';
import adminService from '../../../services/adminService';
import { toast } from 'react-toastify';
import { FaComments, FaCheckCircle, FaExclamationTriangle, FaSpinner, FaChartBar } from 'react-icons/fa';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const AdminFeedbackAnalysisPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [analyzing, setAnalyzing] = useState({});

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const fetchedFeedbacks = await adminService.getAllFeedbacks();
                setFeedbacks(fetchedFeedbacks);
            } catch (error) {
                toast.error('Lỗi khi tải dữ liệu phản hồi.');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleAnalyzeFeedback = async (feedbackId, feedbackText) => {
        setAnalyzing(prev => ({ ...prev, [feedbackId]: true }));
        try {
            const analysis = await adminService.analyzeFeedback(feedbackText);
            setFeedbacks(prevFeedbacks =>
                prevFeedbacks.map(fb =>
                    fb.id === feedbackId ? { ...fb, analysis } : fb
                )
            );
            toast.success('Phân tích phản hồi thành công!');
        } catch (error) {
            toast.error('Lỗi khi phân tích phản hồi.');
        } finally {
            setAnalyzing(prev => ({ ...prev, [feedbackId]: false }));
        }
    };

    const renderSentimentIcon = (sentiment) => {
        switch (sentiment) {
            case 'positive':
                return <FaCheckCircle className="text-green-500 mr-2" />;
            case 'negative':
                return <FaExclamationTriangle className="text-red-500 mr-2" />;
            default:
                return null;
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <FaChartBar className="mr-3 text-purple-600" />
                Phân Tích Phản Hồi
            </h1>
            {feedbacks.length === 0 ? (
                <div className="text-center p-4 text-gray-500">Không có phản hồi nào để hiển thị.</div>
            ) : (
                <div className="space-y-4">
                    {feedbacks.map((feedback) => (
                        <Card key={feedback.id} className="p-6">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                        Phản hồi từ {feedback.studentId}
                                    </h2>
                                    <p className="text-gray-600 italic mb-2">
                                        Ngày: {new Date(feedback.createdAt).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-700">{feedback.content}</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Button
                                        onClick={() => handleAnalyzeFeedback(feedback.id, feedback.content)}
                                        disabled={analyzing[feedback.id]}
                                        className="bg-blue-500 text-white hover:bg-blue-600"
                                    >
                                        {analyzing[feedback.id] ? (
                                            <>
                                                <FaSpinner className="animate-spin mr-2" /> Đang phân tích...
                                            </>
                                        ) : (
                                            <>
                                                <FaComments className="mr-2" /> Phân tích với AI
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                            {feedback.analysis && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                                        {renderSentimentIcon(feedback.analysis.sentiment)}
                                        Kết quả phân tích:
                                    </h3>
                                    <p className="mt-2 text-gray-700">
                                        **Đánh giá:** <span className={`font-semibold ${feedback.analysis.sentiment === 'positive' ? 'text-green-600' : 'text-red-600'}`}>{feedback.analysis.sentiment === 'positive' ? 'Tích cực' : feedback.analysis.sentiment === 'negative' ? 'Tiêu cực' : 'Trung tính'}</span>
                                    </p>
                                    <p className="mt-1 text-gray-700">
                                        **Tóm tắt:** {feedback.analysis.summary}
                                    </p>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminFeedbackAnalysisPage;
