extends Control

signal restarted_game

func _on_RestartButton_button_up() -> void:
	emit_signal("restarted_game")
