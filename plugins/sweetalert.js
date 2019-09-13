// import Vue from 'vue';
// import VueSweetalert2 from 'vue-sweetalert2';

// Vue.use(VueSweetalert2);
const Swal = require('sweetalert2')
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500
});


module.exports = Toast;
