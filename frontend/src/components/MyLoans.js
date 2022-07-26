import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Axios } from '../utils/Axios'
import Dialog from '@mui/material/Dialog'
import Chip from '@mui/material/Chip'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import PendingIcon from '@mui/icons-material/Pending'
import DoneIcon from '@mui/icons-material/Done'
import CancelIcon from '@mui/icons-material/Cancel'
import { Alert, AlertTitle } from '@mui/material'

import './styles/myloans.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../utils/routes'
import Navb from './Navb'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const MyLoans = () => {
    const [selectedLoan, setselectedLoan] = useState(null)
    const [myloans, setMyloans] = useState([])
    const [loanIndex, setloanIndex] = useState()
    const [open, setOpen] = useState(false)
    const [isModifiedclicked, setisModifiedclicked] = useState(false)
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        const getLoans = async () => {
            const MyLoans = await Axios.get('/myloans')
            setMyloans(MyLoans.data.myloans)
        }
        getLoans()
    }, [])

    const getModifiedRequests = (e) => {
        setOpen(true)
        setisModifiedclicked(true)
        setloanIndex(e.target.value)
    }

    const acceptModified = async (e) => {
        setMyloans((state) => {
            const loan = state.find((value) => value._id === selectedLoan)
            loan.status = 'Sanctioned'
            return state
        })
        const modifiedloanIndex = e.target.value
        const data = {
            loanId: myloans[loanIndex]._id,
            modified_id: myloans[loanIndex].modified[modifiedloanIndex]._id,
            tenure: myloans[loanIndex].modified[modifiedloanIndex].Tenure,
            interest_rate:
                myloans[loanIndex].modified[modifiedloanIndex].Interest_Rate,
        }
        await Axios.post('/accept-modified-loan', data)
        handleClose()
    }

    const regectModified = async (e) => {
        const modifiedloanIndex = e.target.value
        const data = {
            loanId: myloans[loanIndex]._id,
            modified_id: myloans[loanIndex].modified[modifiedloanIndex]._id,
        }
        await Axios.post('/reject-modified-loan', data)
        setMyloans((state) => {
            const loan = state.find((loan) => loan._id === selectedLoan)
            loan.modified.splice(modifiedloanIndex, 1)
            return [...state]
        })
    }

    return (
        <div>
            <Navb />
            <Typography mt='1rem' variant='h4' sx={{ marginBottom: '2rem' ,marginLeft:'2rem'}}>
                My Loans
            </Typography>
            {myloans.length === 0 ? (
                <div>
                    <Box sx={{ m: '2rem' }}>
                        <Alert severity='info'>
                            <AlertTitle>Info</AlertTitle>
                            <strong>No loans Applied</strong>
                        </Alert>
                    </Box>
                    <Box display='flex' justifyContent='center'>
                        <Button
                            onClick={() => navigate(ROUTES.APPLY_LOANS)}
                            variant='contained'
                            size='large'
                        >
                            Apply for Loan
                        </Button>
                    </Box>
                </div>
            ) : (
                myloans.map((loan, index) => {
                    return (
                        <div className='loanCard' key={index}>
                            <Card
                                className='card'
                                sx={{
                                    minWidth: 275,
                                    mb: '1rem',
                                    backgroundColor: '#F5F5F5',
                                }}
                            >
                                {loan.status === 'Sanctioned' ? (
                                    ''
                                ) : (
                                    <CardActions className='modifyRequestsButton'>
                                        <Button
                                            size='small'
                                            onClick={(e) => {
                                                setselectedLoan(loan._id)
                                                getModifiedRequests(e)
                                            }}
                                            value={index}
                                            variant='outlined'
                                        >
                                            Modified Loans
                                        </Button>
                                    </CardActions>
                                )}
                                <CardContent>
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color='text.secondary'
                                        gutterBottom
                                    >
                                        Loan ID - {loan._id}
                                    </Typography>
                                    <Typography
                                        variant='h5'
                                        component='div'
                                        gutterBottom
                                    >
                                        Loan Amount :{' '}
                                        <span>
                                            {Number(loan.Amount).toLocaleString(
                                                'en-US',
                                                {
                                                    style: 'currency',
                                                    currency: 'INR',
                                                }
                                            )}
                                        </span>
                                    </Typography>
                                    <Box
                                        className='loan_details'
                                        sx={{
                                            display: 'inline-flex',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Typography
                                            variant='h6'
                                            component='div'
                                            sx={{ width: 300 }}
                                        >
                                            Period :{' '}
                                            <span>{loan.Tenure} Months</span>
                                        </Typography>
                                        <Typography
                                            variant='h6'
                                            component='div'
                                            sx={{ width: 300 }}
                                        >
                                            Interest Rate :{' '}
                                            <span>{loan.Interest_Rate}%</span>
                                        </Typography>
                                    </Box>
                                    {loan.status === 'Rejected' ? (
                                        <div className='statusChip'>
                                            <Chip
                                                icon={<CancelIcon />}
                                                label='Rejected'
                                                color='error'
                                            />
                                        </div>
                                    ) : loan.status === 'Sanctioned' ? (
                                        <div className='statusChip'>
                                            <Chip
                                                icon={<DoneIcon />}
                                                label='Sanctioned'
                                                color='success'
                                            />
                                        </div>
                                    ) : (
                                        <div className='statusChip'>
                                            <Chip
                                                // sx={{ alignSelf: "flex-end" }}
                                                color='info'
                                                label='Pending'
                                                icon={<PendingIcon />}
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    )
                })
            )}

            {isModifiedclicked ? (
                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar sx={{ position: 'relative' }}>
                        <Toolbar>
                            <IconButton
                                edge='start'
                                color='inherit'
                                onClick={handleClose}
                                aria-label='close'
                            >
                                <CloseIcon />
                            </IconButton>
                            <Typography
                                sx={{ ml: 2, flex: 1 }}
                                variant='h6'
                                component='div'
                            >
                                Modified requests by users
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    {myloans[loanIndex].modified.length === 0 ? (
                        <Box sx={{ m: '2rem' }}>
                            <Alert severity='info'>
                                <AlertTitle>Info</AlertTitle>
                                <strong>No modified Requests</strong>
                            </Alert>
                        </Box>
                    ) : (
                        myloans[loanIndex].modified.map(
                            (modifiedLoan, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='modifycard'
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Card
                                            className='card'
                                            sx={{
                                                width: 470,
                                                backgroundColor: '#F5F5F5',
                                            }}
                                        >
                                            <CardContent>
                                                <Typography
                                                    variant='h5'
                                                    component='div'
                                                >
                                                    {' From user ' +
                                                        modifiedLoan
                                                            .modified_user_id
                                                            .username}
                                                </Typography>
                                                <div className='modifiedData'>
                                                    <Typography
                                                        variant='h6'
                                                        component='div'
                                                    >
                                                        {'Interest Rate : ' +
                                                            modifiedLoan.Interest_Rate}
                                                    </Typography>
                                                    <Typography
                                                        variant='h6'
                                                        component='div'
                                                        sx={{ ml: 5 }}
                                                    >
                                                        {'Tenure : ' +
                                                            modifiedLoan.Tenure}
                                                    </Typography>
                                                </div>
                                            </CardContent>
                                            <CardActions>
                                                <div className='arbuttons'>
                                                    <Button
                                                        variant='outlined'
                                                        color='error'
                                                        value={index}
                                                        onClick={regectModified}
                                                    >
                                                        Reject
                                                    </Button>
                                                    <div className='acceptbutton'>
                                                        <Button
                                                            variant='contained'
                                                            color='success'
                                                            value={index}
                                                            onClick={
                                                                acceptModified
                                                            }
                                                        >
                                                            Accept
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardActions>
                                        </Card>
                                    </div>
                                )
                            }
                        )
                    )}
                </Dialog>
            ) : (
                ''
            )}
        </div>
    )
}

export default MyLoans
// = headerWrapper(<MyLoans />)