import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: 'sandbox', // Use 'live' for production transactions
  client_id: 'AXsVifeKKeQH0hTVuyQi-73EpvscowT8Tjar4i_pac29e6kNp_MyhTS_e2nllRVmcoureM-q1DqsxgYR', 
  client_secret: 'EMCabAVXlBESEkGPbM0oFAdrKwi5_CRgGvFC3MjtilRIJl60G6LSBUfAwk3elI1wu7ag9HBH9-vTPgCB'
});
export default paypal;
