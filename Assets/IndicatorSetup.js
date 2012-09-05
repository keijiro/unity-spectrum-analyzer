#pragma strict

@script RequireComponent(AudioAnalyzer)

var elementPrefab : GameObject;

function Start() {
	var spectrumCount = GetComponent.<AudioAnalyzer>().levels.Length ;
	for (var i = 0; i < spectrumCount; i++) {
		var element = Instantiate(elementPrefab);
		element.GetComponent.<IndicatorElement>().index = i;
		element.transform.parent = transform;
		element.transform.localPosition = Vector3(i, 0, 0);
	}
}
