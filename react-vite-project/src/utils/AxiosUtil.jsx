import axios from 'axios';
import FileSaver from 'file-saver';
import { toast } from 'react-toastify';

class AxiosUtil {

    static async downloadBlobGet(path) {
        try {
            const response = await axios.get(path, {
                responseType: 'blob',
            });
            if (response && response.data) {
                const fileType = response.headers['content-type'];
                const filename = response.headers['content-disposition'].match(/filename="(.+?)"/)[1];
                const blob = new Blob([response.data], { type: fileType, });
                FileSaver.saveAs(blob, filename);
            } else {
                toast.error('Error occurred while downloading the file.');
            }
        } catch (error) {
            console.error('Error fetching blob data:', error);
            toast.error('Server error occurred while downloading the file.');
        }
    }

    static async downloadBlobPost(path, payload = {}) {
        try {
            const response = await axios.post(path, payload, {
                responseType: 'blob',
            });
            if (response && response.data) {
                const fileType = response.headers['content-type'];
                const filename = response.headers['content-disposition'].match(/filename="(.+?)"/)[1];
                const blob = new Blob([response.data], { type: fileType, });
                FileSaver.saveAs(blob, filename);
            } else {
                toast.error('Error occurred while downloading the file.');
            }
        } catch (error) {
            console.error('Error fetching blob data:', error);
            toast.error('Server error occurred while downloading the file.');
        }
    }

}
export default AxiosUtil;
