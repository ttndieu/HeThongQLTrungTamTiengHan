import React, { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(5); // Mặc định đánh giá tốt
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!feedbackText.trim()) {
      setError('Vui lòng nhập nội dung phản hồi.');
      return;
    }
    setError(''); // Reset error
    onSubmit({ feedback: feedbackText, rating: rating });
    setFeedbackText(''); // Clear form
    setRating(5);
  };

  const ratingOptions = [1, 2, 3, 4, 5];

  return (
    <div className="p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
      <div className="mb-4">
        <label htmlFor="feedback" className="block text-lg font-semibold text-gray-800 mb-2">
          Nội dung phản hồi/góp ý:
        </label>
        <textarea
          id="feedback"
          rows="6"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder-gray-400"
          placeholder="Nhập phản hồi của bạn tại đây..."
        ></textarea>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      <div className="mb-5">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Đánh giá của bạn (tùy chọn):
        </label>
        <div className="flex space-x-2">
          {ratingOptions.map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`px-3 py-2 rounded-md border transition-colors duration-200
                ${star <= rating ? 'bg-yellow-400 border-yellow-500 text-white' : 'bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300'}
              `}
            >
              ★ {star}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-200"
        >
          Gửi phản hồi
        </button>
      </div>
    </div>
  );
};

export default FeedbackForm;