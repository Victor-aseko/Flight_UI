import React, { useEffect, useState } from 'react'
//import { Header } from "../../components/header/header";

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//import { Header } from "../../components/header/header";
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import './employeeMatching.css'

export const EmployeeMatching = () => {
	const [applicants, setApplicants] = useState([])
	const [selectedApplicant, setSelectedApplicant] = useState(null)
	const [toggle, setToggle] = useState(true)
	const Toggle = () => {
		setToggle(!toggle)
	}

	useEffect(() => {
		// Mock API call to fetch job applicants and their applied jobs
		// Replace this with your actual API call to fetch data from the backend
		setTimeout(() => {
			const mockApplicants = [
				{
					id: 1,
					name: 'John Doe',
					appliedJob: 'Flight Attendant',
					status: 'Pending',
					cv: 'CV for John Doe'
				},
				{
					id: 2,
					name: 'Jane Smith',
					appliedJob: 'Airport Security',
					status: 'Pending',
					cv: 'CV for Jane Smith'
				},
				{
					id: 3,
					name: 'Bob Johnson',
					appliedJob: 'Baggage Handler',
					status: 'Pending',
					cv: 'CV for Bob Johnson'
				}
				// Add more mock data here
			]
			setApplicants(mockApplicants)
		}, 1000) // Simulate a 1-second delay to fetch data
	}, [])

	const handleAction = (applicantId, action) => {
		if (action === 'Accepted') {
			// Update the status to "Approved" if the "Accept" button is clicked
			const updatedApplicants = applicants.map((applicant) =>
				applicant.id === applicantId
					? { ...applicant, status: 'Approved' }
					: applicant
			)
			setApplicants(updatedApplicants)
		} else if (action === 'Declined') {
			const confirmation = window.confirm(
				'Are you sure you want to decline this applicant?'
			)
			if (confirmation) {
				const updatedApplicants = applicants.map((applicant) =>
					applicant.id === applicantId
						? { ...applicant, status: 'Declined' }
						: applicant
				)
				setApplicants(updatedApplicants)
			}
		}
	}

	const handleViewCV = (applicantCV) => {
		// Show the CV details in a modal or separate section
		setSelectedApplicant(applicantCV)
	}

	const handlePrintSuccessfulMatches = () => {
		const successfulMatches = applicants.filter(
			(applicant) => applicant.status === 'Approved'
		)
		printSuccessfulApplicants(successfulMatches)
	}

	const printSuccessfulApplicants = (successfulMatches) => {
		const printWindow = window.open('', '_blank')
		printWindow.document.write(
			'<html><head><title>Approved Applicants</title></head><body>'
		)
		printWindow.document.write(
			'<h1 style="text-align: center;">Approved Applicants</h1>'
		)
		printWindow.document.write(
			'<table style="border-collapse: collapse; width: 100%;">'
		)
		printWindow.document.write(
			"<thead><tr><th style='border: 1px solid black; padding: 5px;'>Applicant ID</th>"
		)
		printWindow.document.write(
			"<th style='border: 1px solid black; padding: 5px;'>Full Names</th>"
		)
		printWindow.document.write(
			"<th style='border: 1px solid black; padding: 5px;'>Applied Job</th></tr></thead>"
		)
		printWindow.document.write('<tbody>')
		successfulMatches.forEach((applicant) => {
			printWindow.document.write('<tr>')
			printWindow.document.write(
				`<td style='border: 1px solid black; padding: 5px;'>${applicant.id}</td>`
			)
			printWindow.document.write(
				`<td style='border: 1px solid black; padding: 5px;'>${applicant.name}</td>`
			)
			printWindow.document.write(
				`<td style='border: 1px solid black; padding: 5px;'>${applicant.appliedJob}</td>`
			)
			printWindow.document.write('</tr>')
		})
		printWindow.document.write('</tbody></table>')
		printWindow.document.write('</body></html>')
		printWindow.document.close()
		printWindow.print()
	}

	return (
		<div className="row ">
			<div className="airport-container">
				<h2 className="title">Airport Job Applicants</h2>
				<table className="applicants-table">
					<thead>
						<tr>
							<th className="header">Applicant ID</th>
							<th className="header">Full Names</th>
							<th className="header">Applied Job</th>
							<th className="header">CV</th>
							<th className="header">Status</th>
							<th className="header-one">Action</th>
							{/* <th className="header">Print</th> */}
						</tr>
					</thead>
					<tbody>
						{applicants.map((applicant) => (
							<tr key={applicant.id}>
								<td className="detail">{applicant.id}</td>
								<td className="detail">{applicant.name}</td>
								<td className="detail">{applicant.appliedJob}</td>
								<td className="detail">
									<button
										onClick={() => handleViewCV(applicant.cv)}
										className="button"
									>
										View CV
									</button>
								</td>
								<td className={`status ${applicant.status.toLowerCase()}`}>
									{applicant.status}
								</td>
								<td>
									<button
										onClick={() => handleAction(applicant.id, 'Accepted')}
										className="button"
									>
										Accept
									</button>
									<button
										onClick={() => handleAction(applicant.id, 'Declined')}
										className="button"
									>
										Decline
									</button>
									<button
										onClick={handlePrintSuccessfulMatches}
										className="button"
									>
										Print
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>

				{/* Modal or separate section to view the CV */}
				{selectedApplicant && (
					<div className="view-cv">
						<h3>CV Details</h3>
						<p>{selectedApplicant}</p>
						<button
							onClick={() => setSelectedApplicant(null)}
							className="button"
						>
							Close
						</button>
					</div>
				)}
			</div>
		</div>
		// </div>
	)
}
