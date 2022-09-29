import React, {useState} from "react";
import { Card as CardMui, Typography, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Modal from './Modal';

type Props = {
    children?: React.ReactNode;
    data: {
        id: number;
        uuid: string;
        title: string;
        subtitle: string;
        updatedAt: string;
    };
};

const useStyles = makeStyles((theme) => ({
    card_mui: {
        background: theme.background,
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'black',
        height: 'auto',
        maxWidth: 'auto',
        workWrap: 'nowrap',
    },
}));

const Card = ({ data }: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    return (
        <>
        <Modal open={open} setOpen={setOpen} data={data} />
        <CardMui className={classes.card_mui} onClick={() => setOpen(true)}>
            <CardContent>
                <Typography variant='body1' align="left" sx={{fontWeight: 'bold'}}>
                    {data.title}
                </Typography>
                <Typography variant='subtitle2' align="right">
                    {data.updatedAt}
                </Typography>
            </CardContent>
        </CardMui>
        </>
    );
};

export default Card;