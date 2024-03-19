import {
  useNotification
} from "../../../common/notification/context/NotificationProvider.tsx";
import {FormEvent, useState} from "react";
import {publicJsonFetch} from "../../../common/api/service/apiService.ts";
import ContactFormRequestDto from "../../dto/ContactFormRequestDto.ts";
import ContactMePage from "./components/ContactMePage.tsx";

export default function ContactMe() {
  const notification = useNotification();
  const [contactMailLoading, setContactMailLoading] = useState<boolean>(false);
  const [sentContactMail, setSentContactMail] = useState<ContactFormRequestDto | undefined>(undefined);

  const sendContactMail = async (contactMailRequestDto: ContactFormRequestDto) => {
    return await publicJsonFetch({
      path: "mail/contact", method: "POST", body: contactMailRequestDto
    });
  };

  const handleError = (error: string | undefined = undefined) => {
    notification.openNotification({
      type: "error", vertical: "top", horizontal: "center",
      message: error ?? "An error has occurred during the e-mail sending process"
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      setContactMailLoading(true);
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const dto: ContactFormRequestDto = {
        email: formData.get("email") as string,
        name: formData.get("name") as string,
        subject: formData.get("subject") as string,
        content: formData.get("content") as string,
        isHtml: false
      };
      const response = await sendContactMail(dto);

      if (response.error || response?.status > 399 || !response.data) {
        handleError(response.error);
        return;
      }

      setSentContactMail(dto);
    } catch (e) {
      const errorMessage =
        "An error has occurred during the e-mail sending process";
      handleError(errorMessage);
    } finally {
      setContactMailLoading(false);
    }
  };

  return <ContactMePage handleSubmit={handleSubmit}
                        contactMailLoading={contactMailLoading}
                        sentContactMail={sentContactMail}
  setSentContactMail={setSentContactMail}/>;
}
