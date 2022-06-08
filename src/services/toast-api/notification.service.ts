import { toast } from 'react-toastify';
import { NotificationPayload } from '~/common/types/types';

export class Notification {
  showMessage({ message, type }: NotificationPayload): void {
    toast(message, {
      type: type,
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
