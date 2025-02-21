// src/components/praktikum/PraktikumGrade.js
import React from 'react';
import Card from '../common/Card';

const PraktikumGrade = ({ grades }) => {
  const getGradeColor = (grade) => {
    if (grade >= 85) return 'text-green-600';
    if (grade >= 70) return 'text-blue-600';
    if (grade >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGradeLabel = (grade) => {
    if (grade >= 85) return 'A';
    if (grade >= 75) return 'B';
    if (grade >= 60) return 'C';
    if (grade >= 50) return 'D';
    return 'E';
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Nilai Praktikum</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {grades.map((grade, index) => (
          <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900">{grade.title}</h3>
                <p className="text-sm text-gray-500">{grade.period}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-2xl font-bold ${getGradeColor(grade.finalGrade)}`}>
                  {getGradeLabel(grade.finalGrade)}
                </span>
                <span className="text-lg text-gray-600">
                  ({grade.finalGrade})
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Progress bars for each component */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Kehadiran</span>
                  <span className="font-medium">{grade.attendance}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${grade.attendance}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Praktik</span>
                  <span className="font-medium">{grade.practical}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${grade.practical}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Tugas</span>
                  <span className="font-medium">{grade.assignments}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-yellow-600 rounded-full"
                    style={{ width: `${grade.assignments}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Ujian</span>
                  <span className="font-medium">{grade.exam}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-2 bg-purple-600 rounded-full"
                    style={{ width: `${grade.exam}%` }}
                  />
                </div>
              </div>
            </div>

            {grade.feedback && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-1">Catatan Pembimbing</h4>
                <p className="text-sm text-blue-700">{grade.feedback}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PraktikumGrade;