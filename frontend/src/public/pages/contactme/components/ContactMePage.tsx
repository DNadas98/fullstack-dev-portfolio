import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {FormEventHandler} from "react";
import {GitHub, LinkedIn, MailOutline} from "@mui/icons-material";
import ContactFormRequestDto from "../dto/ContactFormRequestDto.ts";
import ContactElement from "./ContactElement.tsx";

interface ContactMePageProps {
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined,
  contactMailLoading: boolean,
  sentContactMail: ContactFormRequestDto | undefined,
  setSentContactMail: (value: (ContactFormRequestDto | undefined)) => void
}

export default function ContactMePage(props: ContactMePageProps) {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} flexGrow={1}
          spacing={2} sx={{mt: 2, mb: 4}} minWidth={"fit-content"}>
      <Grid item xs={11} sm={11} md={10} lg={9}>
        <Card sx={{
          paddingTop: 4, textAlign: "center", width: "100%", maxWidth: 800,
          minWidth: "fit-content", marginLeft: "auto", marginRight: "auto"
        }}>
          <Typography variant={"h5"} mb={4}>My Contacts</Typography>
          <Grid container justifyContent={"space-around"} spacing={1}
                minWidth={"fit-content"} paddingBottom={2}>
            <Grid item xs={10} md={3}>
              <ContactElement icon={<MailOutline/>}
                              text={"E-mail"}
                              link={"mailto:daniel.nadas@dnadas.net"}
                              linkText={"daniel.nadas@dnadas.net"}/>
            </Grid>
            <Grid item xs={10} md={3}>
              <ContactElement icon={<LinkedIn/>}
                              text={"LinkedIn"}
                              link={"https://linkedin.com/in/daniel-nadas"}
                              linkText={"Dániel Nádas"}/>
            </Grid>
            <Grid item xs={10} md={3}>
              <ContactElement icon={<GitHub/>}
                              text={"GitHub"}
                              link={"https://github.com/DNadas98"}
                              linkText={"DNadas98"}/>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={11} sm={11} md={10} lg={9}>
        <Card sx={{
          paddingTop: 4, textAlign: "center", width: "100%", maxWidth: 800,
          marginLeft: "auto", marginRight: "auto"
        }}>
          <Stack
            spacing={2}
            alignItems={"center"}
            justifyContent={"center"}>
            <Avatar variant={"rounded"}
                    sx={{backgroundColor: "secondary.main", color: "primary.main"}}>
              <MailOutline/>
            </Avatar>
            {!props.sentContactMail && <Typography variant="h5" gutterBottom>
              Send me a message!
            </Typography>}
          </Stack>
          <CardContent sx={{justifyContent: "center", textAlign: "center"}}>
            <Grid container sx={{
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              gap: "2rem"
            }}>
              <Grid item xs={12}
                    sx={{borderColor: "secondary.main"}}>
                {props.sentContactMail
                  ? <Stack spacing={2}>
                    <Typography variant={"h5"} gutterBottom>
                      Thank you for reaching out!
                    </Typography>
                    <Stack spacing={2} textAlign={"left"}>
                      <Typography variant={"body1"}>
                        Your message was saved successfully, I will get back to you
                        soon.
                      </Typography>
                      <Typography variant={"body1"}>
                        Message Details:
                      </Typography>
                      <Typography variant={"body2"}>
                        E-mail: {props.sentContactMail.email}
                      </Typography>
                      <Typography variant={"body2"}>
                        Name / Company Name: {props.sentContactMail.name}
                      </Typography>
                      <Typography variant={"body2"}>
                        Subject: {props.sentContactMail.subject}
                      </Typography>
                      <Typography variant={"body2"}>
                        {props.sentContactMail.content}
                      </Typography>
                    </Stack>
                    <Button onClick={() => props.setSentContactMail(undefined)}>
                      Reset
                    </Button>
                  </Stack>
                  : <form onSubmit={props.handleSubmit}>
                    <Stack spacing={2}>
                      <TextField type={"email"} required name={"email"}
                                 inputProps={{minLength: 1, maxLength: 50}}
                                 label={"E-mail address"}/>
                      <TextField type={"text"} required name={"name"}
                                 inputProps={{minLength: 1, maxLength: 50}}
                                 label={"Full Name or Company Name"}/>
                      <TextField type={"text"} required name={"subject"}
                                 inputProps={{minLength: 1, maxLength: 50}}
                                 label={"Subject"}/>
                      <TextField type={"text"} required name={"content"}
                                 inputProps={{minLength: 1, maxLength: 2000}}
                                 multiline={true}
                                 minRows={3}
                                 label={"Content"}/>
                      <Button type={"submit"}
                              variant={"contained"}
                              disabled={props.contactMailLoading}>
                        Send
                      </Button>
                    </Stack>
                  </form>}

              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
