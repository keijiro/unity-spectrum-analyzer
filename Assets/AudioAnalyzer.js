#pragma strict

var interval = 0.01;

@HideInInspector
var rawSpectrum : float[];

@HideInInspector
var levels : float[];

function Awake() {
	rawSpectrum = new float[1024];
	levels = new float[8];
}

function Start() {
	while (true) {
		AudioListener.GetSpectrumData(rawSpectrum, 0, FFTWindow.BlackmanHarris);
		ConvertRawSpectrumToLevels();
		yield WaitForSeconds(interval);
	}
}

private function ConvertRawSpectrumToLevels() {
	for (var i = 0; i < levels.Length; i++) {
		levels[i] = 0.0;
	}

	var i2 = 0;
	var C = Mathf.Log(rawSpectrum.Length);
	for (i = 0; i < levels.Length; i++) {
		var x = 1.0 / levels.Length * (i + 1);
		x = Mathf.Exp(C * x);
		var w = 1.0 / (x - i2);
		for (; i2 < x; i2++) {
			levels[i] += w * rawSpectrum[i2];
		}
		levels[i] = Mathf.Sqrt(levels[i]);
	}
}
