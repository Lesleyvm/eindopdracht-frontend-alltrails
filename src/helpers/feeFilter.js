export function filterParksByFees(park, feeFilter) {
    if (feeFilter === '0') {
        // Als feeFilter '0' is, retourneer true als er geen entrance fees zijn
        return !park.entranceFees || park.entranceFees.length === 0;
    }

    if (!park.entranceFees || park.entranceFees.length === 0) {
        return false; // Als er geen entrance fees zijn, voldoet het park niet aan het filter
    }

    // Controleer of minstens één entrance fee voldoet aan het filter
    return park.entranceFees.some((fee) => {
        const parkFee = parseFloat(fee.cost);

        switch (feeFilter) {
            case '10-15':
                return parkFee >= 10.0 && parkFee <= 15.0;
            case '15-25':
                return parkFee > 15.0 && parkFee <= 25.0;
            case '25-35':
                return parkFee > 25.0 && parkFee <= 35.0;
            case '35-50':
                return parkFee > 35.0 && parkFee <= 50.0;
            default:
                return true;
        }
    });
}