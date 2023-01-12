const rupiah = (money) => {
  return money.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }) //Rp. nnn.nnn.nn
}

module.exports = rupiah