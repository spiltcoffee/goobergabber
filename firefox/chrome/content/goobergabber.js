var extGooberGabber = (function() {
	var gWordArray = ["ab", "abber", "abble", "aby", "adget", "adzooks", "affe", "affy", "aga", "alaxy", "allows", "aloot", "amber", "amble", "andalf", "angreen", "angster", "ape", "arbage", "arble", "arden", "argantuan", "argle", "arlic", "arter", "asp", "asper", "assy", "astric", "atling", "atsby", "auche", "auntlet", "awker", "azebo", "elato", "elding", "enie", "enital", "erber", "erbil", "eriatric", "erm", "erund", "et", "hastly", "herkin", "host", "hostly", "iant", "ibber", "ibble", "ibbon", "iblet", "iffy", "iggity", "iggle", "ilbert", "imme", "immick", "inormous", "iraffe", "irth", "irther", "izzard", "izzle", "lamour", "lasnost", "litch", "litter", "loat", "loater", "lobule", "loom", "loomy", "lop", "lorble", "lover", "lutton", "lycerine", "nat", "nome", "oad", "oat", "oatee", "ob", "obber", "obble", "oblin", "odzilla", "offy", "olden", "olfer", "omer", "oo", "oober", "oobly", "ooey", "oofy", "oogle", "oomba", "oon", "oop", "opher", "ore", "orilla", "orp", "ossip", "ouge", "out", "rabber", "rade", "rain", "rand", "rant", "rape", "rasp", "rasper", "rating", "rave", "ravel", "ravity", "ravy", "razer", "rease", "reat", "reedy", "reen", "rief", "rifter", "rinch", "ringo", "rizzly", "roan", "roin", "roiny", "rok", "roper", "ross", "rouchy", "rouper", "rudge", "rumble", "rumpy", "runt", "ubber", "uerilla", "uest", "uff", "uffy", "uide", "uilt", "ulf", "ullet", "ullible", "ulp", "umball", "umbi", "umble", "umdrop", "ump", "umption", "unk", "unner", "uppy", "urgle", "ust", "utter", "uzzler"]

	var result = {
		onPageLoad: onPageLoad
	};

	function onPageLoad(event)
	{
		if(event.originalTarget instanceof HTMLDocument)
		{
			let doc = event.originalTarget;

			if (doc.defaultView.frameElement)
			{
				// Frame within a tab was loaded.
				// Find the root document:
				while (doc.defaultView.frameElement)
				{
					doc = doc.defaultView.frameElement.ownerDocument;
				}
			}

			walk(doc.body);

			if (window.MutationObserver) {
				var observer = new MutationObserver(function (mutations) {
					Array.prototype.forEach.call(mutations, function (m) {
						if (m.type === 'childList') {
							walk(m.target);
						} else if (m.target.nodeType === 3) {
							handleText(m.target);
						}
					});
				});

				observer.observe(doc.body, {
					childList: true,
					attributes: false,
					characterData: true,
					subtree: true
				});
			}
		}
	};

	function walk(node) 
	{
		// I stole this function from here:
		// http://is.gd/mwZp7E
		
		var child, next;

		switch ( node.nodeType )  
		{
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while ( child ) 
				{
					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;

			case 3: // Text node
				handleText(node);
				break;
		}
	};

	function getGWord()
	{
		return gWordArray[Math.floor(Math.random() * gWordArray.length)];
	};

	function handleText(textNode) 
	{
		if (textNode.parentElement.tagName.toLowerCase() === "script" || textNode.parentElement.isContentEditable === true) {
			return false;
		}

		var oldValue = textNode.nodeValue;
		var v = oldValue;

		//gamergater -> alligator
		v = v.replace(/\b(g)amergat[eo]r(s?)\b/ig, "$1lligator$2");
		v = v.replace(/\bglligator(s?)\b/g, "alligator$1");
		v = v.replace(/\bGlligator(s?)\b/g, "Alligator$1");
		v = v.replace(/\ba (alligator?)\b/ig, "an $1");

		//gamergate -> gwordgword
		v = v.replace(/\b(g)amer(g)ate(s?)\b/ig, "$1" + getGWord() + "$2" + getGWord() + "$3");
		
		if (v !== oldValue) {
			textNode.nodeValue = v;
		}
	};

	return result;
})();

// do not try to add a callback until the browser window has
// been initialised. We add a callback to the tabbed browser
// when the browser's window gets loaded.
window.addEventListener("load", onStartup, false);

function onStartup() {
  // Add a callback to be run every time a document loads.
  // note that this includes frames/iframes within the document
  gBrowser.addEventListener("load", extGooberGabber.onPageLoad, true);

  // Cleanup event listener now that we don't need it
  window.removeEventListener("load", onStartup, false);
}