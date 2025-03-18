async function calcularArbitraje() {
    const cripto = document.getElementById('cripto').value;  // Aquí obtenemos correctamente el valor de la opción seleccionada
    const inversion = parseFloat(document.getElementById('inversion').value);
    const precios = await obtenerPrecios();

    const { precioCriptoUsdt, precioCriptoBtc, precioBtcUsdt } = precios;

    // Verificar si los precios fueron obtenidos correctamente
    if (!precioCriptoUsdt || !precioCriptoBtc || !precioBtcUsdt) {
        document.getElementById('resultado').innerText = "Hubo un error al obtener los precios de Binance.";
        return;
    }

    // Realizar el cálculo de arbitraje triangular
    let resultado = (inversion / precioCriptoUsdt) * precioCriptoBtc * precioBtcUsdt;

    // Mostrar los pares y el resultado
    document.getElementById('pares').innerHTML = `
        <p><strong>Países de Cálculo:</strong></p>
        <p><strong>${cripto}/USDT</strong>: ${precioCriptoUsdt} USDT</p>
        <p><strong>${cripto}/BTC</strong>: ${precioCriptoBtc} BTC</p>
        <p><strong>BTC/USDT</strong>: ${precioBtcUsdt} USDT</p>
    `;

    document.getElementById('resultado').innerText = `Resultado: ${resultado.toFixed(2)} USDT`;
}