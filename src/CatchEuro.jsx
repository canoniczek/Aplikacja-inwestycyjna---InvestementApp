import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFundsByUserId } from './supabase';
import { setFunds, setError } from './fundSlice';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';


const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1, 0),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  fontSize: '1rem',
  backgroundColor: 'rgba(173, 216, 230, 0.5)', 
  maxWidth: '500px', 
  width: '100%',
  textAlign: 'left', 
}));

const CatchEuro = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const showCourse = setTimeout(() => {
      fetch('https://api.frankfurter.app/latest?from=EUR&to=PLN')
        .then((response) => response.json())
        .then((currency) => {
          setData(currency.rates.PLN);
        });
    }, 3000);
  }, []);

  const funds = useSelector((state) => state.fund.funds);
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await getFundsByUserId(id);

        if (error) {
          throw new Error(error.message);
        }

        dispatch(setFunds(data));
      } catch (err) {
        dispatch(setError(err.message));
      }
    })();
  }, [id, dispatch]);

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto' }}>
      <CustomPaper>Obecny kurs EUR to: {data} zł</CustomPaper>
      <CustomPaper>Twoje oszczędności względem EUR to: {(funds.reduce((sum, { amount }) => sum + amount, 0) / data).toFixed(2)} zł</CustomPaper>
      <CustomPaper>Twoje oszczędności w PLN to: {funds.reduce((sum, { amount }) => sum + amount, 0)} zł</CustomPaper>
    </Box>
  );
};

export default CatchEuro;
