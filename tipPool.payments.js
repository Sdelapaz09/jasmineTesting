let billAmntInput = document.getElementById('billAmnt');
let tipAmntInput = document.getElementById('tipAmnt');
let paymentFrom = document.getElementsbyId('paymentForm');
let paymentTbody = document.querySelector('#paymentTable tbody');
let summaryTds = document.querySelectorAll('#summaryTable tbody tr td');
let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener('submit', submitPaymentInfo);

function submitPaymentInfo(evt){
  if(evt) evt.preventDefault();
  let curPayment = createCurPayment();
  
  if(curPayment){
    paymentId +=1;
    
    allPayments ['payment' + paymentId] = curPayment;
    
    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();
    billAmntInput.value = '';
    tipAmntInput.value = '';
  }
}

function createCurPayment(){
  let billAmnt = billAmntInput.value;
  let tipAmnt = tipAmntInput.value;
  
  if(billAmnt === '' || tipAmnt === '') return;
  if(Number(billAmnt) > 0 && Number(tipAmnt) >= 0){
    return{
      billAmnt: billAmnt,
      tipAmnt: tipAmnt,
      tipPercent: calculateTipPercent(billAmnt, tipAmnt),
    }
  }
}

function appendPaymentTable(curPayment){
  let newTr = document.createElement('tr');
  newTr.id = 'payment' + paymentId;
  
  appendTd(newTr, '$' + curPayment.billAmnt);
  appendTd(newTr, '$' + curPayment.tipAmnt);
  appendTd(newTr, '%' + curPayment.tipPercent);
  appendDeleteBtn(newTr, 'payment');
  paymentTbody.append(newTr);
}

function updateSummary(){
  let tipPercentAvg = sumPaymentTotal('tipPercent') / Object.keys(allPayments).length;
  
  summaryTds[0].innerHTML = '$' + sumPaymentTotal('billAmnt');
  summaryTds[1].innerHTML = '$' + sumPaymentTotal('tipAmnt');
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + '%';
}
