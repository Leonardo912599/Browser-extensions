import { Card, Typography, Box, Switch, Button } from '@mui/material';
import { remove } from '../store/extensionSlice';
import { useDispatch } from 'react-redux';

const CardEntension = ({ title, description, image, mode, isActive, onToggle }) => {

    const dispatch = useDispatch()

    return (
        <Card
            sx={{
                backgroundColor: mode === 'dark' ? '#1d2637' : 'white',
                borderRadius: 2,
                p: 2,
                width: '100%',
                minHeight: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box display="flex" alignItems='start' gap={2} mb={1}>
                <Box
                    component="img"
                    src={image}
                    alt={`${title} icon`}
                    sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        backgroundColor: '#cfe3d4',
                        p: 1,
                        objectFit: 'contain',
                    }}
                />
                <Box>
                    <Typography fontWeight={'bold'} color={mode === 'dark' ? 'white' : '#023068'} variant="h6">{title}</Typography>
                    <Typography variant="body2" color={mode === 'dark' ? 'white' : 'black'} sx={{ mb: 2 }}>
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                    variant="outlined"
                    sx={{
                        color: mode === 'dark' ? 'white' : '#023068',
                        borderColor: 'white',
                        borderRadius: 5,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        fontSize: 14,
                        borderColor: 'gray'
                    }}
                    onClick={() =>dispatch(remove(title))}
                >
                    Remove
                </Button>
                <Switch
                    checked={isActive}
                    onChange={onToggle}
                    sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                            color: '#ff4d4f',
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                            backgroundColor: '#ff4d4f',
                        },
                    }}
                />
            </Box>
        </Card>
    )
}

export default CardEntension
