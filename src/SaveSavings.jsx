import * as React from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveCurrentState as saveCurrentStateToDb } from './supabase'; 
import { addSingleSave, setError } from './saveSlice';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';


const CustomTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

const CustomButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const SaveSavings = () => {
  const savings_type_plnRef = useRef();
  const savings_type_usdRef = useRef();
  const savings_type_eurRef = useRef();

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const handleSaving = async (e) => {
    e.preventDefault();

    const save = {
      savings_pln: savings_type_plnRef.current.value,
      savings_eur: savings_type_eurRef.current.value,
      savings_usd: savings_type_usdRef.current.value,
      user_id: id,
    };

    try {
      const { data: [newSave], error } = await saveCurrentStateToDb(save);

      if (error) {
        throw new Error(error.message);
      }

      dispatch(addSingleSave(newSave));
    } catch (err) {
      dispatch(setError(err.message));
    }
  };

  return (
    <Box
      component="form"
      sx={{ mt: 3 }}
      onSubmit={handleSaving} 
    >
      <CustomTextField
        inputRef={savings_type_plnRef}
        placeholder="Your savings in PLN"
        variant="outlined"
        type="text"
      />
      <CustomTextField
        inputRef={savings_type_eurRef}
        placeholder="EUR exchange rate"
        variant="outlined"
        type="text"
      />
      <CustomTextField
        inputRef={savings_type_usdRef}
        placeholder="USD exchange rate"
        variant="outlined"
        type="text"
      />
      <CustomButton
        type="submit"
      >
        Save
      </CustomButton>
    </Box>
  );
};

export default SaveSavings;
