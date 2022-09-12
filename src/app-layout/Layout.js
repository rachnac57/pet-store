import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function LayoutHOC(props) {
    const {expanded, children, componentTitle} = props;
    return (
        <Accordion expanded={expanded}>
            <AccordionSummary
                expandIcon={!expanded && <ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{componentTitle}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {children}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}
