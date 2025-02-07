import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import InputFilter from '../components/InputFilter'

const CANDIDATE_URL = '/candidate/'
const CONTRIBUTOR_URL = '/contributors/'
const COMMITTEE_URL = '/committee/'

export const useTableColumns = () => {
  const searchContributorColumns = useMemo(
    () => [
      {
        Header: 'Contributor Name',
        id: 'name',
        accessor: ({ contributor_id, name }) => (
          <Link
            to={(location) => ({
              pathname: CONTRIBUTOR_URL + contributor_id,
              fromPathname: location.pathname,
            })}
          >
            {' '}
            {name}
          </Link>
        ),
        disableSortBy: false,
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'City/State',
        id: 'cityState',
        accessor: ({ city, state }) => city + ', ' + state,
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Type',
        accessor: ({ type }) => (type ? type : '—'),
      },
      {
        Header: 'Profession',
        accessor: ({ profession }) => (profession ? profession : '—'),
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Total Contributions',
        accessor: 'total',
      },
      {
        Header: 'Employer',
        accessor: ({ employer_name }) => (employer_name ? employer_name : '—'),
      },
    ],
    []
  )

  const searchCandidateColumns = useMemo(
    () => [
      {
        Header: 'Name',
        id: 'candidate_full_name',
        accessor: ({ candidate_full_name, committee_sboe_id }) => (
          <Link to={`${CANDIDATE_URL}${committee_sboe_id}`}>
            &nbsp;
            {candidate_full_name}
          </Link>
        ),
        disableSortBy: false,
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Party',
        accessor: 'party',
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Contest',
        id: 'contest',
        accessor: ({ office, juris }) =>
          juris ? `${office} ${juris}` : office,
        disableFilters: false,
        Filter: InputFilter,
      },
    ],
    []
  )

  const searchCommitteeColumns = useMemo(
    () => [
      {
        Header: 'Name',
        id: 'candidate_name',
        accessor: ({ committee_name, committee_sboe_id, office }) =>
          `${office}` !== 'null' ? (
            <Link to={`${CANDIDATE_URL}${committee_sboe_id}`}>
              &nbsp;
              {committee_name}
            </Link>
          ) : (
            <Link to={`${COMMITTEE_URL}${committee_sboe_id}`}>
              &nbsp;
              {committee_name}
            </Link>
          ),
        disableSortBy: false,
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Party',
        accessor: ({ party }) => (party ? party : '—'),
        disableFilters: false,
        Filter: InputFilter,
      },
      {
        Header: 'Contest',
        id: 'contest',
        accessor: ({ office, juris }) =>
          !office ? '—' : juris ? `${office} ${juris}` : office,
        disableFilters: false,
        Filter: InputFilter,
      },
    ],
    []
  )

  const individualContributionsColumns = useMemo(
    () => [
      {
        Header: 'Donation Date',
        id: 'date_occurred',
        accessor: (r) =>
          new Date(r.date_occurred).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }),
        disableSortBy: true,
      },
      {
        Header: 'Recipient Name',
        accessor: ({
          candidate_full_name,
          committee_sboe_id,
          committee_name,
        }) =>
          Boolean(candidate_full_name) ? (
            <Link
              to={(location) => ({
                pathname: CANDIDATE_URL + committee_sboe_id,
                fromPathname: location.pathname,
              })}
            >
              {' '}
              {candidate_full_name}
            </Link>
          ) : (
            <Link
              to={(location) => ({
                pathname: COMMITTEE_URL + committee_sboe_id,
                fromPathname: location.pathname,
              })}
            >
              {' '}
              {committee_name}
            </Link>
          ),
      },
      {
        Header: 'Donation Type',
        accessor: 'transaction_type',
      },
      {
        Header: 'Amount',
        accessor: (r) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          return formatter.format(r.amount)
        },
      },
      {
        Header: 'Total Contributed',
        accessor: (r) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          return formatter.format(r.total_contributions_to_committee)
        },
      },
    ],
    []
  )

  const candidateContributionColumns = useMemo(
    () => [
      {
        id: 'date_occurred',
        Header: 'Contribution Date',
        accessor: (r) => {
          const d = new Date(r.date_occurred)
          return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })
        },
        disableSortBy: false,
      },
      {
        Header: 'Contributor Name',
        id: 'name',
        accessor: ({ contributor_id, name }) => (
          <Link to={`${CONTRIBUTOR_URL}${contributor_id}`}>&nbsp;{name}</Link>
        ),
        disableSortBy: false,
      },
      {
        Header: 'Profession',
        accessor: ({ profession }) => (profession ? profession : '—'),
      },
      {
        Header: 'Transaction Type',
        accessor: 'transaction_type',
      },
      {
        Header: 'Form of Payment',
        accessor: 'form_of_payment',
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: (r) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          return formatter.format(r.amount)
        },
        disableSortBy: false,
      },
    ],
    []
  )

  const committeeContributionColumns = useMemo(
    () => [
      {
        id: 'date_occurred',
        Header: 'Contribution Date',
        accessor: (r) => {
          const d = new Date(r.date_occurred)
          return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })
        },
        disableSortBy: false,
      },
      {
        id: 'name',
        Header: 'Contributor Name',
        accessor: ({ contributor_id, name }) => (
          <Link to={`${CONTRIBUTOR_URL}${contributor_id}`}>&nbsp;{name}</Link>
        ),
        disableSortBy: false,
      },
      {
        Header: 'Profession',
        accessor: ({ profession }) => (profession ? profession : '—'),
      },
      {
        Header: 'Transaction Type',
        accessor: 'transaction_type',
      },
      {
        Header: 'Form of Payment',
        accessor: 'form_of_payment',
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: (r) => {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          })
          return formatter.format(r.amount)
        },
        disableSortBy: false,
      },
    ],
    []
  )

  const expenditureColumns = useMemo(
    () => [
      {
        id: 'date_occurred',
        Header: 'Date',
        accessor: (r) =>
          new Date(r.date_occurred).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }),
        disableSortBy: false,
      },
      {
        Header: 'Recipient of Payment',
        accessor: 'name',
      },
      {
        Header: 'Form of Payment',
        accessor: 'form_of_payment',
      },
      {
        Header: 'Transaction Type',
        accessor: 'transaction_type',
      },
      {
        Header: 'Purpose',
        accessor: ({ purpose }) => (purpose ? purpose : '—'),
      },
      {
        id: 'amount',
        Header: 'Amount',
        accessor: (r) =>
          new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(r.amount),
        disableSortBy: false,
      },
    ],
    []
  )

  return {
    searchContributorColumns,
    searchCandidateColumns,
    searchCommitteeColumns,
    candidateContributionColumns,
    individualContributionsColumns,
    committeeContributionColumns,
    expenditureColumns,
  }
}
