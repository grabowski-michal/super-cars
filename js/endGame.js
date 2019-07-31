function endGame (won) {
    if (won == false) {
        alert("przegrałeś");
        location.reload();
    }
    else {
        alert("miejsce "+pplace)
        location.reload();
    }
}