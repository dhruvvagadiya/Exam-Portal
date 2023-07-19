import Swal from 'sweetalert2'

export const toast = {
  success : Swal.mixin({
    icon : 'success',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true
  }),
  
  error : Swal.mixin({
    icon : 'error',
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true
  })
  
}