const lengthId = document.getElementById('length');
const length = lengthId.value
const lengthValue = document.getElementById('length-value')
const useUpper = document.getElementById('uppercase')
const useLower = document.getElementById('lowercase')
const useNumbers = document.getElementById('numbers')
const useSymbols = document.getElementById('symbols')
const checkboxes = document.querySelectorAll('.charset-option')
const generated = document.getElementById('generated-password')
const btnCopy = document.getElementById('copy-btn')


let pool = "";
let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = uppercase.toLowerCase();
let numbers = "0123456789";
let symbols = "!@#$%&*()_-+=/"

lengthId.addEventListener('input', () => {
    lengthValue.textContent = lengthId.value;
});

function updateConjunction(){
    let conjunction = "";

    if (useUpper.checked) {
        conjunction += uppercase;
    } 

    if (useLower.checked) {
        conjunction += lowercase;
    }

    if (useNumbers.checked) {
        conjunction += numbers;
    }

    if (useSymbols.checked) {
        conjunction += symbols;
    }
    
    console.log("Conjunto de caracteres atual: ", conjunction)

    pool = conjunction
    return pool
}

function handleCheckboxChange(event) {
  const target = event.target;
  const checkedList = Array.from(checkboxes).filter(cb => cb.checked);
  const checkedCount = checkedList.length;

  if (!target.checked) {
    if (checkedCount < 2) {
      alert("Você precisa ter pelo menos 2 conjuntos marcados")
      target.checked = true;
      return;
    }
  }

  // se passou daqui, pode atualizar normalmente
  updateConjunction();
}

function getRandomInt(max) { 
    return Math.floor(Math.random() * max);
}


// Gera o token usando o pool e o valor do input length
function generateToken(length) {
    let token = '';

    for (let i = 0; i < length; i++) {
        const index = getRandomInt(updateConjunction().length); 
        token += pool[index];                    
    }

    generated.value = token;
}

function init(){
    generateToken(lengthId.value)
}

btnCopy.addEventListener('click', async () => {
    const msg = document.getElementById('msg');
    const text = generated.value
    // Tentativa usando a API moderna
    if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
        await navigator.clipboard.writeText(text);
        msg.textContent = 'Copiado pro clipboard!';
        } catch (err) {
        console.error('Erro ao copiar:', err);
        msg.textContent = 'Não deu pra copiar 😢';
        }
    } else {
        // Fallback para navegadores antigos
        inputToken.select();
        inputToken.setSelectionRange(0, text.length); // mobile
        const ok = document.execCommand('copy');

        if (ok) {
        msg.textContent = 'Copiado pro clipboard!';
        } else {
        msg.textContent = 'Não deu pra copiar 😢';
        }

        // tira seleção
        window.getSelection().removeAllRanges();
    }
});

useUpper.addEventListener('change', handleCheckboxChange)
useLower.addEventListener('change', handleCheckboxChange)
useNumbers.addEventListener('change', handleCheckboxChange)
useSymbols.addEventListener('change', handleCheckboxChange)

