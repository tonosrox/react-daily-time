import { orange } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: orange[600],
        },
        background: {
            main: orange[20],
        },
        hover: {
            main: orange[200],
        }
    },
    size: 30
});

export default theme;