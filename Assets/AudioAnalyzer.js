#pragma strict

var interval = 0.01;

@HideInInspector
var rawSpectrum = new float[512];

@HideInInspector
var levels = new float[4];

function Start() {
	while (true) {
		AudioListener.GetSpectrumData(rawSpectrum, 0, FFTWindow.Hamming);
		ConvertRawSpectrumToLevels();
		yield WaitForSeconds(interval);
	}
}

private function ConvertRawSpectrumToLevels() {
	for (var i = 0; i < levels.Length; i++) {
		levels[i] = 0.0;
	}

	for (i = 1; i < 5; i++) {
		levels[0] += rawSpectrum[i];
	}

	for (; i < 64; i++) {
		levels[1] += rawSpectrum[i];
	}

	for (; i < 256; i++) {
		levels[2] += rawSpectrum[i];
	}

	for (; i < rawSpectrum.Length; i++) {
		levels[3] += rawSpectrum[i];
	}
}
