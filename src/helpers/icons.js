import React from 'react'
import {
   AddBox,
   ArrowUpward,
   Check,
   ChevronLeft,
   ChevronRight,
   Clear,
   DeleteOutline,
   Edit,
   FilterList,
   FirstPage,
   LastPage,
   Remove,
   SaveAlt,
   Search,
   ViewColumn,
   Cloud,
   Build,
   BarChartRounded,
   PageviewRounded,
   LiveHelp,
   Settings,
   Person,
   SupervisorAccount,
   Home,
   AddCircle,
   FindInPage,
   TrendingUp
} from '@material-ui/icons'

const classes = {
   subModIcon: {
      fontSize: 60
   }
}

export const Icons = {
   Export: SaveAlt,
   Filter: FilterList,
   FirstPage: FirstPage,
   LastPage: LastPage,
   NextPage: ChevronRight,
   PreviousPage: ChevronLeft,
   ResetSearch: Clear,
   Search: Search,
   SortArrow: ArrowUpward,
   ThirdStateCheck: Remove,
   ViewColumn: ViewColumn,

   /*» MOD'S...  */
   Home: <Home fontSize='small' />,
   Person: <Person fontSize='small' />,
   SupervisorAccount: <SupervisorAccount fontSize='small' />,
   AddBox: <AddBox fontSize='small' />,
   Settings: <Settings fontSize='small' />,
   LiveHelp: <LiveHelp fontSize='small' />,
   BarChartRounded: <BarChartRounded fontSize='small' />,

   /*» SUB-MOD'S...  */
   Create: <AddCircle color='action' style={classes.subModIcon} />,
   FindInPage: <FindInPage color='action' style={classes.subModIcon} />,
   TrendingUp: <TrendingUp color='action' style={classes.subModIcon} />,
   
   Test: <Build />,
   Cloud: <Cloud />,
   Check: <Check />,
   Clear: <Clear />,
   Delete: <DeleteOutline />,
   DetailPanel: <ChevronRight />,
   Edit: <Edit />,
   PageviewRounded: <PageviewRounded />,
}

