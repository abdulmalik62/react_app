import React, { useEffect, useState } from 'react';
import './PatientDataPage.css';
import { FaCheck, FaUser } from 'react-icons/fa';

const PatientDataPage = () => {
    const [patientData, setPatientData] = useState([]);

    useEffect(() => {
        const sampleData = [
            {
              hospitalName: 'RK Hospital',  
              patientName: 'Jeson',
              ageGroup: 'Adult',
              bloodGroup: 'A+',
              gender: 'Male',
              phoneNumber: '1234567890',
              location: 'New York',
              unit: '2',
              customUnit: 'None',
              date: '2024-07-12',
              condition: 'Routine Check-up',
              status: 'Requested',
              message: 'Awaiting approval',
              action: 'tick' 
            },
            {
              hospitalName: 'RK Hospital',  
              patientName: 'Smith',
              ageGroup: 'Child',
              bloodGroup: 'O+',
              gender: 'Female',
              phoneNumber: '0987654321',
              location: 'Los Angeles',
              unit: '1',
              customUnit: 'None',
              date: '2024-07-11',
              condition: 'Accident',
              status: 'Delivered',
              message: 'Thank you',
              action: 'tick' 
            },
            {
              hospitalName: 'RK Hospital',  
              patientName: 'RK Bravo',
              ageGroup: 'Senior',
              bloodGroup: 'B-',
              gender: 'Male',
              phoneNumber: '1122334455',
              location: 'Chicago',
              unit: '3',
              customUnit: 'None',
              date: '2024-07-10',
              condition: 'Surgery',
              status: 'Moved to labtomist',
              message: 'Successfully moved to labtomist',
              action: 'person' 
            }
        ];

        const existingData = JSON.parse(localStorage.getItem('patientData') || '[]');

        if (existingData.length === 0) {
            localStorage.setItem('patientData', JSON.stringify(sampleData));
        }

        setPatientData(existingData.length === 0 ? sampleData : existingData);
    }, []);

    const handleStatusChange = (index, newStatus) => {
        const updatedData = [...patientData];
        updatedData[index].status = newStatus;
        updatedData[index].message = getMessage(newStatus);
        setPatientData(updatedData);
        localStorage.setItem('patientData', JSON.stringify(updatedData));
    };

    const getMessage = (status) => {
        switch (status) {
            case 'Requested':
                return 'Awaiting approval';
            case 'Delivered':
                return 'Thank you!';
            case 'Moved to labtomist':
                return 'Successfully moved to labtomist';
            default:
                return '';
        }
    };

    const handleActionClick = (index, action) => {
        const updatedData = [...patientData];
        updatedData[index].action = action;
        setPatientData(updatedData);
        localStorage.setItem('patientData', JSON.stringify(updatedData));
    };

    return (
        <div className="table-container">
            <h2 className="table-title">Blood Request Recipient Data</h2>
            <table className="patient-data-table">
                <thead>
                    <tr>
                        <th>Hospital Name</th>
                        <th>Patient Name</th>
                        <th>Age Group</th>
                        <th>Blood Group</th>
                        <th>Gender</th>
                        <th>Phone Number</th>
                        <th>Location</th>
                        <th>Unit</th>
                        <th>Custom Unit</th>
                        <th>Date</th>
                        <th>Condition</th>
                        <th>Status</th>
                        <th>Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.map((patient, index) => (
                        <tr key={index}>
                            <td>{patient.hospitalName}</td>
                            <td>{patient.patientName}</td>
                            <td>{patient.ageGroup}</td>
                            <td>{patient.bloodGroup}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.phoneNumber}</td>
                            <td>{patient.location}</td>
                            <td>{patient.unit}</td>
                            <td>{patient.customUnit}</td>
                            <td>{patient.date}</td>
                            <td>{patient.condition}</td>
                            <td>
                                <select
                                    value={patient.status}
                                    onChange={(e) => handleStatusChange(index, e.target.value)}
                                >
                                    <option value="Requested">Requested</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Moved to labtomist">Moved to labtomist</option>
                                </select>
                            </td>
                            <td>{patient.message}</td>
                            <td>
                                <button
                                    className={`action-btn ${patient.action === 'tick' ? 'active' : ''}`}
                                    onClick={() => handleActionClick(index, 'tick')}
                                >
                                    <FaCheck />
                                </button>
                                <button
                                    className={`action-btn ${patient.action === 'person' ? 'active' : ''}`}
                                    onClick={() => handleActionClick(index, 'person')}
                                >
                                    <FaUser />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientDataPage;
