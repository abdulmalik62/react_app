import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const BloodRequestForm = () => {
  const [formData, setFormData] = useState({
    patientName: '',
    ageGroup: '',
    bloodGroup: '',
    gender: '',
    phoneNumber: '',
    location: '',
    unit: '',
    customUnit: '',
    date: '',
    condition: '',
  });

  const [isCustom, setIsCustom] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'unit') {
      if (value === 'custom') {
        setIsCustom(true);
        setFormData((prevState) => ({
          ...prevState,
          unit: '',
        }));
      } else {
        setIsCustom(false);
        setFormData((prevState) => ({
          ...prevState,
          unit: value,
        }));
      }
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalUnit = isCustom ? formData.customUnit : formData.unit;

    const formattedDate = new Date(formData.date).toISOString().split('T')[0];

    const requestData = {
      patientname: formData.patientName,
      bloodgroup: formData.bloodGroup,
      age: formData.ageGroup,
      units: finalUnit,
      reason: formData.condition,
      gender: formData.gender,
      phone: formData.phoneNumber,
      location: formData.location,
      requiredbefore: formattedDate,
    };
    console.log(requestData);

    try {
      const response = await axios.post('http://localhost:8084/BloodX/BloodRequest/Create', requestData);
      if (response.status === 201) {
        console.log('Form data sent successfully');
        setShowModal(true);
      } else {
        console.error('Error in form submission', response.status);
      }
    } catch (error) {
      console.error('Error in form submission', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-5 border border-gray-300 rounded-lg shadow-lg bg-gray-100 mt-10"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Welcome to the Blood Request Portal</h1>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-gray-700 font-bold mb-2">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            maxLength={30}
            pattern="[A-Za-z\s]+"
            title="Only alphabetical letters are allowed"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ageGroup" className="block text-gray-700 font-bold mb-2">Age:</label>
          <input
            type="text"
            id="ageGroup"
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bloodGroup" className="block text-gray-700 font-bold mb-2">Blood Group:</label>
          <select
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            pattern="[0-9]{10}"
            title="Enter a valid 10-digit phone number"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="unit" className="block text-gray-700 font-bold mb-2">
            Units:
            <select
              id="unit"
              name="unit"
              value={isCustom ? 'custom' : formData.unit}
              onChange={handleChange}
              disabled={isCustom}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Select Unit</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="custom">Other</option>
            </select>
          </label>
          {isCustom && (
            <label className="block text-gray-700 font-bold mb-2">
              Custom Units:
              <input
                type="number"
                name="customUnit"
                value={formData.customUnit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </label>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Required Before:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="condition" className="block text-gray-700 font-bold mb-2">Condition/Reason for Requirement:</label>
          <textarea
            id="condition"
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            rows={4}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="flex justify-center">
          <Modal.Title className="w-full text-center">Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">Your form has been successfully submitted!</Modal.Body>
        <Modal.Footer className="flex justify-center">
          <Button variant="primary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BloodRequestForm;
