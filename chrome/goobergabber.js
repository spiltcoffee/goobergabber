var gWordArray = ["ab", "abber", "aby", "affe", "affy", "alaxy", "amber", "amble", "andalf", "arbage", "arble", "arden", "argantuan", "argle", "arlic", "arter", "asp", "asper", "assy", "atsby", "auntlet", "awker", "elato", "enie", "enital", "erber", "eriatric", "erm", "hastly", "herkin", "host", "iant", "ibber", "ibble", "iblet", "iffy", "iggle", "inormous", "iraffe", "izzle", "lamour", "litter", "lobule", "lorble", "lycerine", "nome", "oad", "oat", "oatee", "obber", "obble", "oblin", "offy", "olden", "olfer", "omer", "oo", "oober", "oobly", "oofy", "oogle", "ook", "oomba", "oon", "oop", "opher", "ore", "ossip", "out", "rabber", "rade", "rain", "rand", "rasp", "rasper", "rave", "ravel", "ravity", "ravy", "rease", "reat", "reen", "rief", "rinch", "rizzly", "roin", "roiny", "ross", "rudge", "rumble", "rumpy", "ubber", "uerilla", "uest", "uff", "uffy", "uide", "uilt", "ulf", "ullet", "ullible", "umball", "umble", "umdrop", "ump", "umption", "urgle", "ust", "uzzler"]

walk(document.body);

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

	observer.observe(document.body, {
		childList: true,
		attributes: false,
		characterData: true,
		subtree: true
	});
}

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
}

function getGWord()
{
	return gWordArray[Math.floor(Math.random() * gWordArray.length)];
}

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
}