#pragma strict

@script RequireComponent(AudioAnalyzer)

var elementPrefab : GameObject;

function Start() {
	var bands = GetComponent.<AudioAnalyzer>().bandLevels.Length ;
	for (var i = 0; i < bands; i++) {
		var element = Instantiate(elementPrefab);
		element.GetComponent.<IndicatorElement>().index = i;
		element.transform.parent = transform;
		element.transform.localPosition = Vector3(i, 0, 0);
	}
}
