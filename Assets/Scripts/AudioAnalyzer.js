#pragma strict

var interval = 0.02;
var spectrumSamples = 1024;
var numberOfBands = 8;

private var rawSpectrum : float[];

@HideInInspector
var bandLevels : float[];

function Awake() {
	rawSpectrum = new float[spectrumSamples];
	bandLevels = new float[numberOfBands];
}

function Start() {
	while (true) {
		AudioListener.GetSpectrumData(rawSpectrum, 0, FFTWindow.BlackmanHarris);
		ConvertRawSpectrumToBandLevels();
		yield WaitForSeconds(interval);
	}
}

private function ConvertRawSpectrumToBandLevels() {
	var coeff = Mathf.Log(rawSpectrum.Length);
	var offs = 0;
	for (var i = 0; i < bandLevels.Length; i++) {
		var next = Mathf.Exp(coeff / bandLevels.Length * (i + 1));
		var weight = 1.0 / (next - offs);
		for (var sum = 0.0; offs < next; offs++) {
			sum += rawSpectrum[offs];
		}
		bandLevels[i] = Mathf.Sqrt(weight * sum);
	}
}
