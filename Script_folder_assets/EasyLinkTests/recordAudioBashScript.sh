#!/bin/bash

record_audio()
{
    filename=$(date +%m-%d-%Y-%T)
    directory="$HOME/Desktop/"
    speaker="alsa_output.pci-0000_00_1f.3.analog-stereo"

    notify-send "Recording started"
    exec parec -d "$speaker".monitor | lame -r -V0 - "$directory""$filename".mp3
}

main()
{
    if pgrep "parec"
    then
        pkill "parec" && notify-send "Recording stopped"
    else
        record_audio
    fi
}

main "$@"