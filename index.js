const express = require('express');
const app = express();

// Função para contar vogais
// exercício 1
function contarVogais(palavra) {
  const vogais = 'aeiouAEIOU';
  let contador = 0;
  for (let letra of palavra) {
    if (vogais.includes(letra)) {
      contador++;
    }
  }
  return contador;
}

// Função para calcular o montante do investimento
// exercício 2
function calcularMontante(capital, taxaJuros, tempo) {
  const montante = capital * Math.pow((1 + taxaJuros), tempo);
  return montante.toFixed(2); // Retorna com duas casas decimais
}

// Função para contar a frequência de um caractere em uma string
// exercício 3
function contarCaractere(string, caractere) {
  let contador = 0;
  for (let letra of string) {
    if (letra === caractere) {
      contador++;
    }
  }
  return contador;
}

// Função para verificar se um ano é bissexto
// exercício 4
function anoBissexto(ano) {
  if ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

// Função para encontrar o maior e o menor número em um array
// exercício 5
function encontrarMaiorMenor(numeros) {
  const menor = Math.min(...numeros);
  const maior = Math.max(...numeros);
  return { menor, maior };
}

// Função para simular uma loteria
// exercício 6
function simularLoteria(numerosEscolhidos) {
  const sorteio = new Set();
  while (sorteio.size < 6) {
    sorteio.add(Math.floor(Math.random() * 60) + 1);
  }

  const numerosSorteados = Array.from(sorteio);
  const acertos = numerosEscolhidos.filter(num => numerosSorteados.includes(num)).length;

  return {
    numerosSorteados,
    acertos
  };
}

// Rota para contar vogais
app.get('/contar-vogais', (req, res) => {
  const palavra = req.query.palavra;
  if (!palavra) {
    return res.send('Por favor, forneça uma palavra.');
  }
  const numeroDeVogais = contarVogais(palavra);
  res.send(`A palavra "${palavra}" contém ${numeroDeVogais} vogais.`);
});

// Rota para calcular o retorno do investimento
app.get('/calcular-investimento', (req, res) => {
  const capital = parseFloat(req.query.capital); // Capital inicial
  const taxaJuros = parseFloat(req.query.taxaJuros) / 100; // Taxa de juros em %
  const tempo = parseInt(req.query.tempo); // Tempo em meses

  if (isNaN(capital) || isNaN(taxaJuros) || isNaN(tempo)) {
    return res.send('Por favor, forneça valores válidos para capital, taxa de juros e tempo.');
  }

  const montante = calcularMontante(capital, taxaJuros, tempo);
  res.send(`O montante do investimento após ${tempo} meses será R$ ${montante}.`);
});

// Rota para contar quantas vezes um caractere aparece em uma string
app.get('/contar-caractere', (req, res) => {
  const string = req.query.string;
  const caractere = req.query.caractere;

  if (!string || !caractere || caractere.length !== 1) {
    return res.send('Por favor, forneça uma string e um caractere válido.');
  }

  const contador = contarCaractere(string, caractere);
  res.send(`O caractere "${caractere}" aparece ${contador} vezes na string "${string}".`);
});

// Rota para verificar se o ano é bissexto
app.get('/ano-bissexto', (req, res) => {
  const ano = parseInt(req.query.ano);

  if (isNaN(ano)) {
    return res.send('Por favor, forneça um ano válido.');
  }

  if (anoBissexto(ano)) {
    res.send(`O ano ${ano} é bissexto.`);
  } else {
    res.send(`O ano ${ano} não é bissexto.`);
  }
});

// Rota para encontrar o menor e o maior número em um array
app.get('/maior-menor', (req, res) => {
  const numeros = req.query.numeros;

  if (!numeros) {
    return res.send('Por favor, forneça um array de números.');
  }

  const numerosArray = numeros.split(',').map(Number);

  if (numerosArray.some(isNaN)) {
    return res.send('Por favor, forneça apenas números válidos.');
  }

  const { menor, maior } = encontrarMaiorMenor(numerosArray);
  res.send(`O menor número é ${menor} e o maior número é ${maior}.`);
});

// Rota para simular uma loteria
app.get('/simular-loteria', (req, res) => {
  const numerosEscolhidos = req.query.numeros;

  if (!numerosEscolhidos) {
    return res.send('Por favor, forneça 6 números escolhidos, separados por vírgula.');
  }

  const numerosArray = numerosEscolhidos.split(',').map(Number);

  if (numerosArray.length !== 6 || numerosArray.some(isNaN)) {
    return res.send('Por favor, forneça exatamente 6 números válidos.');
  }

  const { numerosSorteados, acertos } = simularLoteria(numerosArray);
  res.send(`Números sorteados: ${numerosSorteados.join(', ')}. Você acertou ${acertos} números.`);
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
