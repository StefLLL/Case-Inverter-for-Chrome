chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "",
  });
});

async function changeCase() {
  // Get selected text
  let text = window.getSelection().toString();

  // Change cases
  const letters = text.split("");
  const newLetters = [];
  for (let letter of letters) {
      if (letter === letter.toUpperCase()) {
          newLetters.push(letter.toLowerCase());
      }
      else {
          newLetters.push(letter.toUpperCase());
      }
  }
  changedText = newLetters.join("");

  // Write to clipboard
  try {
    await navigator.clipboard.writeText(changedText);
  } catch (error) {
    console.error(error.message);
  }
}


chrome.action.onClicked.addListener(async (tab) => {
  // Exclude pages that start with "chrome://" because they generate errors. This includes the Google starting page but not the Google search pages.
  if (tab.url?.startsWith("chrome://")) return undefined;
 
  chrome.scripting
      .executeScript({
        target : {tabId : tab.id},
        func : changeCase,
      });   
});