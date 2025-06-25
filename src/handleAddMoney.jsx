const handleAddMoney = () => {
  const amount = parseFloat(inputAmount);
  if (!isNaN(amount) && amount > 0) {
    setTotalMoney((prev) => prev + amount);
    setInputAmount("");
    setShowAddForm(false);
  }
};
