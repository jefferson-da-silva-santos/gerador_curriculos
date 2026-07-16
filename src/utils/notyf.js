import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export function showNotification(type, message) {
  const notyf = new Notyf({
    dismissible: true,
    duration: 3000,
    position: {
      x: 'right',
      y: 'top',
    },
  });

  if (type === 'success') {
    notyf.success(message);
  } else if (type === 'error') {
    notyf.error(message);
  } else {
    notyf.open({
      type: 'info',
      message: message,
    });
  }
}