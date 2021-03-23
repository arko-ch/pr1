import React, { useState, useEffect, useRef } from 'react';
import { AttachedFiles as Attached } from './EmailStyledComponents';
import { Library as Icons, FontAwesomeIcon } from '../app/icons';
import mail from '../services/Mail'
const $mail = mail
const AttachedFiles = ({
  files,
  handleOpenAttachments,
  handleCloseAttachments,
  id,
  attachments,
  conversationId
}) => {
  const [totalattachmentsui,setTotalattachmentsui] = useState(0)
  
  const totalattachments = async () =>{
    let resTruemessageIds = await $mail.getConvmsgid(conversationId);  
    let correctedmsgID = (resTruemessageIds.data.messages.value || []).map(i => i.id);
     
      correctedmsgID.forEach(async id => {
       // console.log('id',id)
        //http://localhost:1338/mail-outlook/messages/AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABK_fEvAAAAA==/attachments/AQMkADMwNmI4YTY3LWFjZDctNDdmOS1hMmE1LTJhZGUxOWY3NWIxNABGAAADqBCIigcO20iQywAELs4eVAcAATx5ceQnj0GMzazgBhlVdwAAAgEMAAAAATx5ceQnj0GMzazgBhlVdwABK_fEvAAAAAESABAAHN3Elq453E69BYOsXbo3VQ==
        let resattachlist = await $mail.getAttachmentsList(id);      
        //let haba = resattachlist.data.attachments.value.length;
        setTotalattachmentsui(resattachlist.data.attachments.value.length)      
      });
      
    
  }
  useEffect(() => {
    totalattachments();
  }, []);
  
  return (
    <Attached
      onClick={e =>
        attachments ? handleCloseAttachments(e) : handleOpenAttachments(e, id)
      }
    >
      <FontAwesomeIcon icon={Icons.faPaperclip} /> Attached Files ({totalattachmentsui})
    </Attached>
  );
};

export default AttachedFiles;
