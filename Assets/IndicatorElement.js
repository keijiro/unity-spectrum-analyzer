#pragma strict

var index = 0;

private var meter = 0.0;

static private var analyzer : AudioAnalyzer;

function Start() {
	if (!analyzer) analyzer = FindObjectOfType(AudioAnalyzer);
}

function Update() {
	meter = Mathf.Max(meter * Mathf.Exp(-10.0 * Time.deltaTime), analyzer.levels[index]);
	transform.localScale.y = meter * 40.0;
}
