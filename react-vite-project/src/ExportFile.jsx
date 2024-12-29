import React from 'react'
import AxiosUtil from './utils/AxiosUtil';

const ExportFile = () => {
    const handleDownload = async () => {
        console.log('Button clicked....')
        try {
        await AxiosUtil.downloadBlobGet('http://localhost:8061/hostel/hostel-template');
        
        } catch (error) {
            console.error("Error downloading the file:", error);
        }
    };

    const handleEnv = async () => {
      console.log('Button clicked....')
     const enKey = process.env.VITE_ENC_KEY;
     console.log(enKey);
     const decKey = atob(enKey);
     console.log(decKey); //DECODE
     console.log(btoa(decKey)); //ENCODE
  };

    const handleDownloadZip = async () => {
      console.log('Button clicked....')
      try {
      const payload = {
          pageNumber: 0,pageSize: 0,sortBy: "",sortOrder: "",
          exportExcel: false,exportCsv: false,exportPdf: true,exportZip: false,
          fullLoad: true,fullName: "",emailId: ""
        };
        
      await AxiosUtil.downloadBlobPost('http://localhost:8061/hostel/get-hostellers',payload);

      // console.log(response);
      // const fileType = response.headers['content-type'];
      // const filename = response.headers['content-disposition'].match(/filename="(.+?)"/)[1];
      // const blob = new Blob([response.data],{type: fileType,});
      // FileSaver.saveAs(blob,filename);

      } catch (error) {
          console.error("Error downloading the file:", error);
      }
  };
  return (
    <div>ExportFile
        <button onClick={handleEnv}>Download Excel Template</button>
    </div>
  )
}

export default ExportFile