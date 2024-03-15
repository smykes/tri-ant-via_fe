import * as React from "react";
import { useEffect, useState } from "react";
import { Endpoint } from "../../constants";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";
import { IWinnersWins } from "../../Interfaces/Interfaces";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Winner = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const { winner } = useParams();
  console.log(winner);
  function getDate(numericDate: number): string {
    const clueDate = new Date(numericDate);
    const clueString = `${
      clueDate.getMonth() + 1
    }/${clueDate.getDate()}/${clueDate.getFullYear()}`;

    return clueString;
  }
  const [winnerInfo, setWinnerInfo] = useState<Array<IWinnersWins>>();
  const month = DateTime.now();
  console.log(month);

  useEffect(() => {
    async function fetchBooks() {
      const res = await fetch(`${Endpoint.BACKEND_API}/trivia/user/${winner}`);
      console.log(res);
      const json = await res.json();
      if (json) {
        const data: any = json.sort(function (a: any, b: any): number {
          if (a.clue_date < b.clue_date) return -1;
          if (a.clue_date > b.clue_date) return 1;
          return 0;
        });
        setWinnerInfo(data);
      }
    }
    fetchBooks();
  }, [winner]);

  return (
    <>
      {winnerInfo && (
        <Card
          sx={{
            maxWidth: 345,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "3em",
          }}
        >
          {winnerInfo && (
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="initial">
                  {winnerInfo[0].winners[0].user[1].toUpperCase()}
                </Avatar>
              }
              title={winnerInfo[0].winners[0].user}
              subheader={`${winnerInfo[0].winners[0].country} - ${winnerInfo[0].winners[0].flag}`}
            />
          )}

          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Win Count: {winnerInfo.length}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <List>
                {winnerInfo.map((info) => {
                  return (
                    <>
                      <ListItem>
                        <ListItemText
                          primary={`${getDate(info.clue_date)}`}
                          secondary={
                            <>
                              <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {info.clue}
                              </Typography>
                              <Typography
                                component="p"
                                variant="body2"
                                color="text.secondary"
                              >
                                <a href={info.url}>{info.answer}</a>
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider light />
                    </>
                  );
                })}
              </List>
            </CardContent>
          </Collapse>
        </Card>
      )}
    </>
  );
};
